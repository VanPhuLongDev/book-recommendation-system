package com.bookshopping.controller;

import com.bookshopping.model.OrderDetail;
import com.bookshopping.model.OrderItem;
import com.bookshopping.model.User;
import com.bookshopping.payload.response.ResponseMessage;
import com.bookshopping.service.BookService;
import com.bookshopping.service.OrderDetailService;
import com.bookshopping.service.OrderItemService;
import com.bookshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<OrderDetail> order(@RequestParam Integer userId,
                                                 @RequestParam int totalPrice,
                                                 @RequestBody List<OrderItem> orderItems) {
        // Đầu tiên: delete cartItem đã order
        User user = userService.findById(userId);
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setUser(user);
        orderDetail.setDateOrder(LocalDateTime.now());
        orderDetail.setTotalPrice(totalPrice);
        // Save orderDetail into database
        orderDetail = orderDetailService.save(orderDetail);
        for(OrderItem orderItem : orderItems) {
            orderItem.setOrderDetail(orderDetail);
            orderItemService.saveOrderItem(orderItem);
            bookService.subAmount(orderItem.getBook().getId(), orderItem.getAmount());
        }
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("/findById")
    public ResponseEntity<OrderDetail> findById(@RequestParam Integer id) {
        OrderDetail orderDetail = orderDetailService.findById(id);
        if(orderDetail == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("/findByUserId")
    public ResponseEntity<List<OrderDetail>> findByUserId(@RequestParam Integer userId) {
        List<OrderDetail> orderDetails = orderDetailService.findByUserId(userId);
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @GetMapping("/hasUserBoughtBook")
    public boolean hasUserBoughtBook(@RequestParam Integer userId, @RequestParam Integer bookId) {
        return orderItemService.hasUserBoughtBook(userId, bookId);
    }
}
