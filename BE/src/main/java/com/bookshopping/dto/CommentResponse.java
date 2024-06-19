package com.bookshopping.dto;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

public interface CommentResponse {
    @Value("#{target.id}")
    int getId();

    @Value("#{target.user_id}")
    int getUserId();

    @Value("#{target.book_id}")
    int getBookId();

    @Value("#{target.username}")
    String getUsername();

    @Value("#{target.comment}")
    String getComment();

    @Value("#{target.rating_recommendation}")
    String getRatingRecommendation();

    @Value("#{target.created_at}")
    LocalDate getCreatedAt();

    @Value("#{target.updated_at}")
    LocalDate getUpdatedAt();
}