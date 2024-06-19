package com.bookshopping.repository;

import com.bookshopping.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into order_item(order_detail_id, book_id, price, amount) " +
            "VALUES(:orderDetailId, :bookId, :price, :amount)", nativeQuery = true)
    void saveOrderItem(Integer orderDetailId, Integer bookId, int price, int amount);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.book.id = :bookId AND oi.orderDetail.user.id = :userId")
    Optional<OrderItem> findOrderItemByBookIdAndUserId(@Param("bookId") Integer bookId, @Param("userId") Integer userId);
}
