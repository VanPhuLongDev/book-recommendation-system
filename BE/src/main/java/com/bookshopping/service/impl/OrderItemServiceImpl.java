package com.bookshopping.service.impl;

import com.bookshopping.model.OrderItem;
import com.bookshopping.repository.OrderItemRepository;
import com.bookshopping.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Override
    public void saveOrderItem(OrderItem orderItem) {
        orderItemRepository.saveOrderItem(orderItem.getOrderDetail().getId(),
                orderItem.getBook().getId(), orderItem.getPrice(), orderItem.getAmount());
    }

    @Override
    public boolean hasUserBoughtBook(Integer userId, Integer bookId) {
        return orderItemRepository.findOrderItemByBookIdAndUserId(bookId, userId).isPresent();
    }
}
