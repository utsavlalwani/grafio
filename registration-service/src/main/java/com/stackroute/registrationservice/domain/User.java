package com.stackroute.registrationservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class User {

    @Id
    private String username;
    private String name;
    private String email;
    private Date dateOfBirth;

    private ArrayList<String> posts;
    private ArrayList<String> viewed;

    private String[] newsPreferences;
}
