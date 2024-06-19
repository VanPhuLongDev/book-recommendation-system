package com.bookshopping.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String avatar;
    private int amount;
    private int price;
    private int numberRating;
    private float averageRating;
    private int category1;
    private int category2;
    private int category3;
    private String author;
    private String coverForm;
    private String publisher;
    private String supplier;

    @Column(length = 8000)
    private String description;
    @Column(length = 2000)
    private String moreInformation;

    @ManyToOne(targetEntity = Category.class)
    private Category category;

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private List<OrderItem> orderItems;
}
