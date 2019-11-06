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

import java.math.BigInteger;
import java.util.List;

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
    public ResponseEntity<?> getPost(@PathVariable BigInteger id) {
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
            System.out.println(posted.toString());
            responseEntity = new ResponseEntity<Post>(posted, HttpStatus.CREATED);
            PostDTO postDTO = PostDTO.builder()
                    .id(posted.getId())
                    .title(posted.getTitle())
                    .location(posted.getLocation())
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
    public ResponseEntity<?> deletePost(@PathVariable BigInteger id) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Post>(postService.deletePost(id), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getAllPosts() {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<List<Post>>(postService.getAllPosts(), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @GetMapping("/posts/{category}")
    public ResponseEntity<?> getPostsByCategory(@PathVariable String category) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<List<Post>>(postService.getPostsByCategory(category), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }


    @GetMapping("/posts/trending")
    public ResponseEntity<?> getTrendingPosts()  {
        ResponseEntity responseEntity;
        try {
            List<Post> trendingPosts=postService.getAllPosts();
            responseEntity = new ResponseEntity<List<Post>>(postService.getTrendingPosts(trendingPosts), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
    @GetMapping("/posts/trending/{category}")
    public ResponseEntity<?> getTrendingPostsByCategory(@PathVariable String category)  {
        ResponseEntity responseEntity;
        try {
            List<Post> trendingPostsByCategory=postService.getPostsByCategory(category);
            trendingPostsByCategory=postService.getTrendingPosts(trendingPostsByCategory);
            responseEntity = new ResponseEntity<List<Post>>(postService.getTrendingPosts(trendingPostsByCategory), HttpStatus.OK);
        } catch (PostNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

}
