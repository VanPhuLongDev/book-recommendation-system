package com.bookshopping.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private int id;
    private int book_id;
    private int user_id;
    private String comment;
    private float rating_recommendation;
    private String username;
}
