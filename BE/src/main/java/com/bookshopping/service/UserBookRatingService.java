package com.bookshopping.service;

import com.bookshopping.dto.CommentResponse;
import com.bookshopping.model.UserBookRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserBookRatingService {
    UserBookRating findByUserIdAndBookId(int userId, int bookId);

//    Optional<UserBookRating> findByUserIdAndBookId(int userId, int bookId);

    UserBookRating addRating(int userId, int bookId, float ratingRecommendation, String comment, boolean isUserRating);

    UserBookRating updateRating(int userId, int bookId, float newRatingRecommendation, String comment, boolean isUserRating);

    Page<UserBookRating> paginate(Pageable page);
    List<Integer> getBooksCare(int userId, int limit);

    List<CommentResponse> getComment(Integer bookId);
}
