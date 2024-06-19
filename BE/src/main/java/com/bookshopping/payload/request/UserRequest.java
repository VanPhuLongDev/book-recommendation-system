package com.bookshopping.payload.request;

import com.bookshopping.model.AuthProvider;
import com.bookshopping.model.GenderType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private Integer id;
    private String name;
    @Email
    private String email;
    private String address;
    private String gender;
    private LocalDate birthday;
    private String phone;
    private String imageUrl;
    private AuthProvider provider;
}
