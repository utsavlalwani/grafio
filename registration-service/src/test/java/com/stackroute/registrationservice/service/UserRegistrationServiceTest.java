package com.stackroute.registrationservice.service;

import com.stackroute.registrationservice.domain.User;
import com.stackroute.registrationservice.exception.UserAlreadyExistsException;
import com.stackroute.registrationservice.repository.UserRegistrationRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserRegistrationServiceTest {
    private User user;

    @Mock
    private UserRegistrationRepository userRegistrationRepository;

    @InjectMocks
    private UserRegistrationServiceImpl userRegistrationServiceImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        user = User.builder()
                    .username("username")
                    .build();
    }

    @Test
    public void testSaveUserSuccess() throws UserAlreadyExistsException {
        when(userRegistrationRepository.findByUsername(any())).thenReturn(null);
        when(userRegistrationRepository.save(any())).thenReturn(user);
        userRegistrationServiceImpl.saveUser(user);
        verify(userRegistrationRepository, times(1)).save(user);
        verify(userRegistrationRepository, times(1)).findByUsername(user.getUsername());
    }

    @Test(expected = UserAlreadyExistsException.class)
    public void testSaveUserFailure() throws UserAlreadyExistsException {
        when(userRegistrationRepository.findByUsername(any())).thenReturn(user);
        userRegistrationServiceImpl.saveUser(user);
    }

    @Test
    public void testGetUser() {
        when(userRegistrationRepository.findByUsername(any())).thenReturn(user);
        userRegistrationServiceImpl.getUser(user.getUsername());
        verify(userRegistrationRepository, times(1)).findByUsername(user.getUsername());
    }
}
