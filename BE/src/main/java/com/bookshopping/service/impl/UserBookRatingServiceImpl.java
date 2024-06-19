package com.bookshopping.service.impl;

import com.bookshopping.dto.CommentResponse;
import com.bookshopping.model.UserBookRating;
import com.bookshopping.repository.UserBookRatingRepository;
import com.bookshopping.service.UserBookRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserBookRatingServiceImpl implements UserBookRatingService {
    @Autowired
    UserBookRatingRepository userBookRatingRepository;

    @Override
    public UserBookRating findByUserIdAndBookId(int userId, int bookId) {
        Optional<UserBookRating> optionalRating = userBookRatingRepository.findByUserIdAndBookId(userId, bookId);
        return optionalRating.orElse(null);
    }

    @Override
    public UserBookRating addRating(int userId, int bookId, float ratingRecommendation, String comment, boolean isUserRating) {
        UserBookRating newRating = new UserBookRating();
        newRating.setUserId(userId);
        newRating.setBookId(bookId);
        newRating.setRatingRecommendation(ratingRecommendation);
        newRating.setComment(comment);
        newRating.setUserRating(isUserRating);
        LocalDate now = LocalDate.now();
        newRating.setCreatedAt(now);
        newRating.setUpdatedAt(now);


        return userBookRatingRepository.save(newRating);
    }

    @Override
    public UserBookRating updateRating(int userId, int bookId, float newRatingRecommendation, String comment, boolean isUserRating) {
        Optional<UserBookRating> optionalRating = userBookRatingRepository.findByUserIdAndBookId(userId, bookId);

        if (optionalRating.isPresent()) {
            UserBookRating existingRating = optionalRating.get();
            existingRating.setRatingRecommendation(newRatingRecommendation);
            existingRating.setComment(comment);
            existingRating.setUserRating(isUserRating);
            existingRating.setUpdatedAt(LocalDate.now());
            return userBookRatingRepository.save(existingRating);
        } else {
            throw new IllegalArgumentException("Rating does not exist for this user and book.");
        }
    }

    @Override
    public Page<UserBookRating> paginate(Pageable page) {
        return userBookRatingRepository.findAll(page);
    }

    @Override
    public List<Integer> getBooksCare(int userId, int limit) {
        return userBookRatingRepository.getBooksCare(userId, limit);
    }

    @Override
    public List<CommentResponse> getComment(Integer bookId) {
        return userBookRatingRepository.getComment(bookId);
    }
}
