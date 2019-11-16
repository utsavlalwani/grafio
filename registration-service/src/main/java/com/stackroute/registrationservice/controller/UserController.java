package com.stackroute.registrationservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.registrationservice.domain.Post;
import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.domain.UserDAO;
import com.stackroute.registrationservice.domain.UserDTO;
import com.stackroute.registrationservice.exception.UserAlreadyExistsException;
import com.stackroute.registrationservice.exception.UserNotFoundException;
import com.stackroute.registrationservice.service.UserRegistrationService;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    private Queue queue;

    static final String queueName="user";
    static final String topicExchangeName="user-auth";
    static final String routingKey = "user.auth.reg";

    @Autowired
    public UserController(UserRegistrationService userRegistrationService, RabbitTemplate rabbitTemplate, Queue queue) {
        this.userRegistrationService=userRegistrationService;
        this.rabbitTemplate = rabbitTemplate;
        this.queue = new Queue(queueName, false);
        BindingBuilder.bind(queue)
                .to(new TopicExchange(topicExchangeName))
                .with("user.auth.#");
    }

    @PostMapping("register")
    public ResponseEntity<?> saveUser(@RequestBody UserDAO userDao) {
        List<Post> posts = new ArrayList<Post>();
        User user = User.builder()
                        .name(userDao.getName())
                        .dateOfBirth(userDao.getDateOfBirth())
                        .email(userDao.getEmail())
                        .username(userDao.getUsername())
                        .newsPreferences(userDao.getNewsPreferences())
                        .posts(posts)
                        .liked(posts)
                        .bought(posts)
                        .watched(posts)
                        .flagged(posts)
                        .build();
        ResponseEntity responseEntity;
        try{
            User savedUser = userRegistrationService.saveUser(user);
            UserDTO userDTO = new UserDTO(user.getUsername(), bcryptEncoder.encode(userDao.getPassword()));
            rabbitTemplate.convertAndSend(topicExchangeName, routingKey, new ObjectMapper().writeValueAsString(userDTO));
            responseEntity = new ResponseEntity<User>( savedUser,HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (JsonProcessingException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @GetMapping("register/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<User>(userRegistrationService.getUser(username), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @PutMapping("register/{username}")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<User>(userRegistrationService.updateUser(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
}
