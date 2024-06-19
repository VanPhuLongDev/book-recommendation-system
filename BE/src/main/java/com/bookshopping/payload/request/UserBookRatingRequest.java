package com.bookshopping.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookRatingRequest {
    private int userId;
    private List<Integer> bookIds;
    private List<Float> ratingRecommendations;
    private List<String> comments;
    private List<Boolean> isUserRatings;
}
