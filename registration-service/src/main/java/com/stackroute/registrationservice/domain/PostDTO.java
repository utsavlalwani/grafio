package com.stackroute.registrationservice.domain;

import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PostDTO implements Serializable {
    private long id;
    private String title;
    private String videoUrl;
    private Date timestamp;
    private List<String> tags;
    private boolean isAnonymous;
    private User postedBy;
}
