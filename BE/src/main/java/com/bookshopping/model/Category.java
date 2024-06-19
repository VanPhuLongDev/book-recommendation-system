package com.bookshopping.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String imageUrl;
    private int parent;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Book> books;

    public Category() {

    }
    public Category(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category(int id) {
        this.id = id;
    }

    public Category(String name) {
        this.name = name;
    }
}