package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.exception.UserAlreadyExistsException;
import com.stackroute.registrationservice.repository.UserRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRegistrationServiceImpl implements UserRegistrationService{

    private UserRegistrationRepository userRegistrationRepository;

    @Autowired
    public UserRegistrationServiceImpl(UserRegistrationRepository userRegistrationRepository){this.userRegistrationRepository=userRegistrationRepository;}

    @Override
    public User saveUser(User user)throws UserAlreadyExistsException
    {
        if(userRegistrationRepository.findByUsername(user.getUsername()).size()!=0)
        {
            throw new UserAlreadyExistsException("You have already registered yourself!");
        }


        User savedUser = userRegistrationRepository.save(user);
        return savedUser;
    }

    @Override
    public List<User> getUser() {
        return  userRegistrationRepository.findAll();
    }

}
