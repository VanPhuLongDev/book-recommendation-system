package com.bookshopping.service.impl;

import com.bookshopping.model.OrderDetail;
import com.bookshopping.repository.OrderDetailRepository;
import com.bookshopping.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail findById(Integer id) {
        return orderDetailRepository.findById(id).orElse(null);
    }

    @Override
    public List<OrderDetail> findByUserId(Integer userId) {
        return orderDetailRepository.findOrderDetailsByUserId(userId);
    }
}
