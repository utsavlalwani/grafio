package com.stackroute.loginservice.repository;

import com.stackroute.loginservice.domain.DAOUser;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@RunWith(SpringRunner.class)
@DataJpaTest
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@AutoConfigureTestDatabase(replace = NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    private DAOUser daoUser;

    @Before
    public void setup() {
        daoUser = new DAOUser(1, "username", "password");
    }

    @After
    public void tear() {
        userRepository.deleteAll();
    }

    @Test
    public void testFindByUsername() {
        userRepository.save(daoUser);
        DAOUser fetchUser = userRepository.findByUsername("username");
        Assert.assertEquals(fetchUser.getUsername(), daoUser.getUsername());
        Assert.assertEquals(fetchUser.getPassword(), daoUser.getPassword());
    }

    @Test
    public void testFindByUsernameFailure() {
        userRepository.deleteAll();
        DAOUser fetchUser = userRepository.findByUsername("username");
        Assert.assertNull(fetchUser);
    }

}
