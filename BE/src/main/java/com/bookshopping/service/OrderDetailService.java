package com.bookshopping.service;

import com.bookshopping.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    OrderDetail save(OrderDetail orderDetail);
    OrderDetail findById(Integer id);
    List<OrderDetail> findByUserId(Integer userId);
}
