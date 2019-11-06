package com.stackroute.contentservice.domain;

import lombok.*;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PostDTO implements Serializable {
    private BigInteger id;
    private String title;
    private String videoUrl;
    private Date timestamp;
    private String location;
    private List<String> tags;
    private User postedBy;
    private String category;
}
