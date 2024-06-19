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

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookIdsRequest {
    private List<Integer> ids;
    private int numberRecord = 20;
}
