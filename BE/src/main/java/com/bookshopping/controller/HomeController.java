package com.bookshopping.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HomeController {
    @GetMapping("")
    public ResponseEntity<String> getAllCategories() {
        return new ResponseEntity<>("Xin chao cac ban", HttpStatus.OK);
    }
}
