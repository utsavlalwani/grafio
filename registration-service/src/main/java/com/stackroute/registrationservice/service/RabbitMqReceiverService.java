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
                    .videoUrl(postDTO.getVideoUrl())
                    .location(postDTO.getLocation())
                    .tags(postDTO.getTags())
                    .timestamp(postDTO.getTimestamp())
                    .category(postDTO.getCategory())
                    .build();
            User user = userRegistrationService.getUser(postDTO.getPostedBy().getUsername());
            if(user.getPosts()!=null) {
                user.getPosts().add(post);
            } else {
                List<Post> posts = new ArrayList<Post>();
                posts.add(post);
                user.setPosts(posts);
            }
            for (User userFind: postDTO.getLikedBy()) {
                if(user.getUsername().equals(userFind.getUsername())) {
                    if(user.getLiked()!=null) {
                        user.getLiked().add(post);
                    } else {
                        List<Post> posts = new ArrayList<Post>();
                        posts.add(post);
                        user.setLiked(posts);
                    }
                }
            }
            for (User userFind: postDTO.getWatchedBy()) {
                if(user.getUsername().equals(userFind.getUsername())) {
                    if(user.getWatched()!=null) {
                        user.getWatched().add(post);
                    } else {
                        List<Post> posts = new ArrayList<Post>();
                        posts.add(post);
                        user.setWatched(posts);
                    }
                }
            }
            for (User userFind: postDTO.getFlaggedBy()) {
                if(user.getUsername().equals(userFind.getUsername())) {
                    if(user.getFlagged()!=null) {
                        user.getFlagged().add(post);
                    } else {
                        List<Post> posts = new ArrayList<Post>();
                        posts.add(post);
                        user.setFlagged(posts);
                    }
                }
            }
            userRegistrationService.updateUser(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
