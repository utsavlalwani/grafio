package com.stackroute.service;

import com.stackroute.domain.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMqReceiverService {
    @Autowired
    private UserDetailService userDetailService;

    public void receiveMessage(UserDTO user) {
        userDetailService.save(user);
    }

}
