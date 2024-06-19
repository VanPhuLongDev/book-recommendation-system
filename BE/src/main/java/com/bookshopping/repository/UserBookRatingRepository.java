package com.bookshopping.repository;

import com.bookshopping.dto.CommentResponse;
import com.bookshopping.model.UserBookRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBookRatingRepository  extends JpaRepository<UserBookRating, Integer> {

    boolean existsByUserIdAndBookId(int userId, int bookId);

    Optional<UserBookRating> findByUserIdAndBookId(int userId, int bookId);

    Page<UserBookRating> findAll(Pageable page);

    @Query(value = "SELECT book_id FROM user_book_rating WHERE user_id = :userId and rating_recommendation >= 3  ORDER BY id DESC LIMIT :limit", nativeQuery = true)
    List<Integer> getBooksCare(int userId, int limit);

    @Query(value = "SELECT r.*, u.name as username FROM (SELECT * FROM user_book_rating WHERE book_id = :bookId and is_user_rating = 1) as r JOIN user AS u ON u.id = r.user_id ORDER BY created_At DESC limit 20", nativeQuery = true)
    List<CommentResponse> getComment(Integer bookId);
}
