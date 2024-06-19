package com.bookshopping.controller;

import com.bookshopping.model.Book;
import com.bookshopping.model.Category;
import com.bookshopping.payload.response.ResponseMessage;
import com.bookshopping.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Category>> getAllCategories() {
        System.out.println("find all category");
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Category> createBook(@RequestBody Category category) {
        System.out.println("Create new category");
        Category categoryCreate = categoryService.save(category);
        if(categoryCreate == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(categoryCreate, HttpStatus.OK);
    }
}
