package com.bookshopping.repository;

import com.bookshopping.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Transactional
    OrderDetail save(OrderDetail orderDetail);

    @Query(value = "select * from order_detail where user_id = :userId order by date_order desc", nativeQuery = true)
    List<OrderDetail> findOrderDetailsByUserId(Integer userId);
}
