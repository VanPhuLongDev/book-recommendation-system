package com.bookshopping.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {
    private List<Integer> book_ids;
    private int topK;
}
