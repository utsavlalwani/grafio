package com.stackroute.contentservice.service;

import com.stackroute.contentservice.domain.Post;
import com.stackroute.contentservice.exception.PostAlreadyExistsException;
import com.stackroute.contentservice.exception.PostNotFoundException;
import com.stackroute.contentservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService{
    private PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post getPost(long id) throws PostNotFoundException {
        if(postRepository.findById(id).isEmpty()) {
           throw new PostNotFoundException("Post with id: "+id+" not found!");
        }
        return postRepository.findById(id).get();
    }

    @Override
    public Post savePost(Post post) throws PostAlreadyExistsException {
        if(!postRepository.findById(post.getId()).isEmpty()) {
            throw new PostAlreadyExistsException("Post with id: "+post.getId()+" already exists!");
        }
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) throws PostNotFoundException {
        if(postRepository.findById(post.getId()).isEmpty()) {
            throw new PostNotFoundException("Post with id: "+post.getId()+" not found!");
        }
        return postRepository.save(post);
    }

    @Override
    public Post deletePost(long id) throws PostNotFoundException {
        if(postRepository.findById(id).isEmpty()) {
            throw new PostNotFoundException("Post with id: "+id+" not found!");
        }
        Post post = postRepository.findById(id).get();
        postRepository.delete(post);
        return post;
    }
}
