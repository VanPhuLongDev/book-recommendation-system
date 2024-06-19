package com.bookshopping.service.impl;

import com.bookshopping.payload.request.RecommendationRequest;
import com.bookshopping.payload.response.RecommendResponse;
import com.bookshopping.payload.response.RelativeResponse;
import com.bookshopping.payload.response.SemanticResponse;
import com.bookshopping.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AIServiceImpl implements AIService {
    @Autowired
    private RestTemplate restTemplate;
    private final String URL = "http://localhost:5000";

    @Override
    public List<Integer> getRecommendation(List<Integer> bookIds, int topK) {
        RecommendationRequest request = new RecommendationRequest();
        request.setBook_ids(bookIds);
        request.setTopK(topK);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<RecommendationRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<RecommendResponse> response = restTemplate.exchange(URL + "/recommend/hybrid_recommend", HttpMethod.POST, entity, RecommendResponse.class);

        // Chuyển đổi mảng kết quả sang List
        if (response.getStatusCode().is2xxSuccessful()) {
            RecommendResponse body = response.getBody();
            if (body != null) {
                return body.getListBooks();
            }
        }
        return new ArrayList<>();
    }

    @Override
    public List<RelativeResponse> getBooksRelative(int bookId) {
        // Xây dựng URL với request param
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(URL + "/books/relative")
                .queryParam("book_id", bookId).queryParam("limit", 20);

        // Gọi API và nhận phản hồi
        ResponseEntity<RelativeResponse[]> response = restTemplate.getForEntity(uriBuilder.toUriString(), RelativeResponse[].class);

        // Chuyển đổi mảng kết quả sang List
        if (response.getStatusCode().is2xxSuccessful()) {
            RelativeResponse[] body = response.getBody();
            if (body != null) {
                return Arrays.asList(body);
            }
        }
        return new ArrayList<>();
    }

    @Override
    public List<SemanticResponse> getBooksSemantic(String text) {
        // Xây dựng URL với request param
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(URL + "/books/semantic")
                .queryParam("texts", text);

        System.out.println(uriBuilder.toUriString());

        // Gọi API và nhận phản hồi
        ResponseEntity<SemanticResponse[]> response = restTemplate.getForEntity(uriBuilder.toUriString(), SemanticResponse[].class);

        // Chuyển đổi mảng kết quả sang List
        if (response.getStatusCode().is2xxSuccessful()) {
            SemanticResponse[] body = response.getBody();
            if (body != null) {
                return Arrays.asList(body);
            }
        }
        return new ArrayList<>();
    }
}
