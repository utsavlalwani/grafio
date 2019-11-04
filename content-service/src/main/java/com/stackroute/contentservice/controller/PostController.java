package com.stackroute.contentservice.controller;

import com.stackroute.contentservice.domain.Post;
import com.stackroute.contentservice.domain.PostDTO;
import com.stackroute.contentservice.exception.PostAlreadyExistsException;
import com.stackroute.contentservice.exception.PostNotFoundException;
import com.stackroute.contentservice.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class PostController {
    private PostService postService;
    private RabbitTemplate rabbitTemplate;
    private String topicExchange = "post";
    private String routingKey = "user.post.new";

    @Autowired
    public PostController(PostService postService, RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        this.postService = postService;
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPost(@PathVariable String id) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Post>(postService.getPost(id), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @PostMapping("/post")
    public ResponseEntity<?> savePost(@RequestBody Post post) {
        ResponseEntity responseEntity;
        try {
            Post posted = postService.savePost(post);
            responseEntity = new ResponseEntity<Post>(posted, HttpStatus.CREATED);
            PostDTO postDTO = PostDTO.builder()
                    .id(posted.getId())
                    .title(posted.getTitle())
                    .timestamp(posted.getTimestamp())
                    .tags(posted.getTags())
                    .videoUrl(posted.getVideoUrl())
                    .isAnonymous(posted.isAnonymous())
                    .category(posted.getCategory())
                    .postedBy(posted.getPostedBy())
                    .build();
            rabbitTemplate.convertAndSend(topicExchange, routingKey , new ObjectMapper().writeValueAsString(postDTO));
        } catch (PostAlreadyExistsException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (JsonProcessingException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PutMapping("/post")
    public ResponseEntity<?> updatePost(@RequestBody Post post) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Post>(postService.updatePost(post), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Post>(postService.deletePost(id), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
}
