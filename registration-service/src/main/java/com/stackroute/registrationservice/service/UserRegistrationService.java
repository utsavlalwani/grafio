package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.exception.UserAlreadyExistsException;

import java.util.List;

public interface UserRegistrationService {
    public User saveUser(User user)throws UserAlreadyExistsException;
    public List<User> getUser();
}
