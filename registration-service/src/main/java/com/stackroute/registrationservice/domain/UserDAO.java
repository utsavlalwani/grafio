package com.stackroute.registrationservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDAO {

    @Id
    private String username;
    private String name;
    private String email;
    private Date dateOfBirth;
    private String[] newsPreferences;
    private String password;

}
