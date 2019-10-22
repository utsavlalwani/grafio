package com.stackroute.loginservice.service;

import com.stackroute.loginservice.domain.DAOUser;
import com.stackroute.loginservice.domain.UserDTO;
import com.stackroute.loginservice.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class RabbitMqReceiverServiceTest {

    private UserDTO userDTO;
    private DAOUser daoUser;
    @Mock
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private RabbitMqReceiverService rabbitMqReceiverService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        userDTO = new UserDTO("username", "password");
        daoUser = new DAOUser(1, "username", "password");
    }

//    @Test
//    public void testReceiveMessage() {
//        when(userDetailsServiceImpl.save((UserDTO)any())).thenReturn(daoUser);
//        rabbitMqReceiverService.receiveMessage(userDTO);
//        verify(userDetailsServiceImpl, times(1)).save(userDTO);
//    }
}
