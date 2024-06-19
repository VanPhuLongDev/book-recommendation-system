package com.bookshopping.service;

import com.bookshopping.payload.response.RelativeResponse;
import com.bookshopping.payload.response.SemanticResponse;

import java.util.List;

public interface AIService {
    List<Integer> getRecommendation(List<Integer> bookIds, int topK);

    List<RelativeResponse> getBooksRelative(int bookId);
    List<SemanticResponse> getBooksSemantic(String text);
}
