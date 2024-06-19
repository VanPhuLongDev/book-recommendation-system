package com.bookshopping.service;

import com.bookshopping.model.OrderItem;

public interface OrderItemService {
    void saveOrderItem(OrderItem orderItem);
    boolean hasUserBoughtBook(Integer userId, Integer bookId);
}
