package com.bookshopping.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime dateOrder;

    private int totalPrice;

    @ManyToOne(targetEntity = User.class)
    private User user;

    @OneToMany(mappedBy = "orderDetail")
    @JsonManagedReference("order")
    private List<OrderItem> orderItems;
}
