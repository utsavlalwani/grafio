package com.stackroute.registrationservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.domain.UserDAO;
import com.stackroute.registrationservice.domain.UserDTO;
import com.stackroute.registrationservice.exception.UserAlreadyExistsException;
import com.stackroute.registrationservice.service.UserRegistrationService;
import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "api/v1")
public class UserController {

    UserRegistrationService userRegistrationService;
    private final RabbitTemplate rabbitTemplate;

    private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private Queue queue;

    @Autowired
    public UserController(UserRegistrationService userRegistrationService, RabbitTemplate rabbitTemplate){this.userRegistrationService=userRegistrationService;
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("register")
    public ResponseEntity<?> saveUser(@RequestBody UserDAO userDao) {
        User user = User.builder()
                        .name(userDao.getName())
                        .dateOfBirth(userDao.getDateOfBirth())
                        .email(userDao.getEmail())
                        .username(userDao.getUsername())
                        .newsPreferences(userDao.getNewsPreferences())
                        .build();
        ResponseEntity responseEntity;
        ArrayList<String> listOfPosts = new ArrayList<>();//user.getPosts();
        ArrayList<String> listOfViews = new ArrayList<>();

        listOfPosts .add("www.google.com");
        listOfPosts.add("www.deccanherald.com");
        user.setPosts(listOfPosts);

        listOfViews.add("www.yahoo.com");
        listOfViews.add("www.facebook.com");
        listOfViews.add("www.bing.com");
        user.setViewed(listOfViews);


        try{
            User savedUser = userRegistrationService.saveUser(user);
            UserDTO userDTO = new UserDTO(user.getUsername(), bcryptEncoder.encode(userDao.getPassword()));
            rabbitTemplate.convertAndSend(queue.getName(), new ObjectMapper().writeValueAsString(userDTO));
            responseEntity = new ResponseEntity<User>( savedUser,HttpStatus.CREATED);
        }
        catch (UserAlreadyExistsException | JsonProcessingException e)
        {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);

        }
        return responseEntity;

    }

    @GetMapping("register")
    public ResponseEntity<?> getUserData() {
        return new ResponseEntity<List<User>>(userRegistrationService.getUser(),HttpStatus.OK);
    }

}
