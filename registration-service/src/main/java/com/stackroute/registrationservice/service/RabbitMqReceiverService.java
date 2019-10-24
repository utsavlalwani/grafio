package com.stackroute.registrationservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.registrationservice.domain.Post;
import com.stackroute.registrationservice.domain.PostDTO;
import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RabbitMqReceiverService {
    @Autowired
    private UserRegistrationService userRegistrationService;

    public void receiveMessage(String message) {
        PostDTO postDTO;
        try {
            postDTO = new ObjectMapper().readValue(message, PostDTO.class);
            Post post = Post.builder()
                    .id(postDTO.getId())
                    .title(postDTO.getTitle())
                    .video_url(postDTO.getVideoUrl())
                    .tags(postDTO.getTags())
                    .timestamp(postDTO.getTimestamp())
                    .isAnonymous(postDTO.isAnonymous())
                    .build();
            System.out.println(postDTO.toString());
            User user = userRegistrationService.getUser(postDTO.getPostedBy().getUsername());
            if(user.getPosts()!=null) {
                user.getPosts().add(post);
            } else {
                List<Post> posts = new ArrayList<Post>();
                posts.add(post);
                user.setPosts(posts);
            }
            userRegistrationService.updateUser(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
