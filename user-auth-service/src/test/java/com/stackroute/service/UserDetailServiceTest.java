package com.stackroute.service;

import com.stackroute.domain.DAOUser;
import com.stackroute.domain.UserDTO;
import com.stackroute.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserDetailServiceTest {
    private DAOUser daoUser;
    private UserDTO userDTO;
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder bCryptEncoder;

    @InjectMocks
    private UserDetailService userDetailService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        daoUser = new DAOUser(1, "username", "password");
        userDTO = new UserDTO("username", "password");
    }

    @Test
    public void testLoadUserByUsernameSuccess() throws UsernameNotFoundException {
        when(userRepository.findByUsername(any())).thenReturn(daoUser);
        userDetailService.loadUserByUsername("username");
        verify(userRepository, times(1)).findByUsername("username");
    }

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadUserByUsernameFailure() throws UsernameNotFoundException {
        when(userRepository.findByUsername(any())).thenReturn(null);
        userDetailService.loadUserByUsername("username");
    }

}
