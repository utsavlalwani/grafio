package com.stackroute.contentservice.service;

import com.stackroute.contentservice.domain.Post;
import com.stackroute.contentservice.exception.PostAlreadyExistsException;
import com.stackroute.contentservice.exception.PostNotFoundException;

public interface PostService {
    Post getPost(String id) throws PostNotFoundException;
    Post savePost(Post post) throws PostAlreadyExistsException;
    Post updatePost(Post post) throws PostNotFoundException;
    Post deletePost(String id) throws PostNotFoundException;
}
