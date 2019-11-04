package com.stackroute.contentservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
@Getter
@Setter
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private BigInteger id;
    private String title;
    private String videoUrl;
    private Date timestamp;
    private User postedBy;
    private List<String> tags;
    private String category;
    private boolean isAnonymous;
    private List<User> likedBy;
    private List<User> flaggedBy;
    private List<User> boughtBy;
    private List<User> watchedBy;
}
