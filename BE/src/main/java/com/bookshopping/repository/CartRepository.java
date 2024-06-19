package com.bookshopping.repository;

import com.bookshopping.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Transactional
    @Modifying
    Cart save(Cart cart);
}
