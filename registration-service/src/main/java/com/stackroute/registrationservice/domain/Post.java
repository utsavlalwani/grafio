package com.stackroute.registrationservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Post {

    @Id
    private long id;
    private String title;
    private String video_url;
    private Date timestamp;
    private List<String> tags;
    private boolean isAnonymous;
    private String category;

}
