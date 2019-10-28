package com.stackroute.contentservice.service;

import com.stackroute.contentservice.exception.FileStorageException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

public interface FileStorageService {
    String storeFile(MultipartFile file) throws FileStorageException;
    Resource loadFileAsResource(String fileName) throws FileNotFoundException;
}
