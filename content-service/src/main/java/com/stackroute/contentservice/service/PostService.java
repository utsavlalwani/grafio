package com.stackroute.contentservice.service;

import com.stackroute.contentservice.domain.Post;
import com.stackroute.contentservice.exception.PostAlreadyExistsException;
import com.stackroute.contentservice.exception.PostNotFoundException;

import java.math.BigInteger;

public interface PostService {
    Post getPost(BigInteger id) throws PostNotFoundException;
    Post savePost(Post post) throws PostAlreadyExistsException;
    Post updatePost(Post post) throws PostNotFoundException;
    Post deletePost(BigInteger id) throws PostNotFoundException;
}
