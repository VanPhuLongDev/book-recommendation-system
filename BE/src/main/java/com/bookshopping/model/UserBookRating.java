package com.bookshopping.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int userId;
    private int bookId;

    private boolean isUserRating = false;

    private float ratingRecommendation;
    private String comment = "";

    private LocalDate createdAt;
    private LocalDate updatedAt;
}
