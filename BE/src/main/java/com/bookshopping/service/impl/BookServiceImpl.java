package com.bookshopping.service.impl;

import com.bookshopping.model.Book;
import com.bookshopping.repository.BookRepository;
import com.bookshopping.service.AIService;
import com.bookshopping.service.BookService;
import com.bookshopping.util.RecommendCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RecommendCacheService cacheRecommend;

    @Autowired
    private AIService aiService;

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public int updateAmount(Integer bookId, int amount) {
        return bookRepository.updateAmount(bookId, amount);
    }

    @Override
    public int subAmount(Integer bookId, int amount) {
        return bookRepository.subAmount(bookId, amount);
    }

    @Override
    public Book findById(Integer id) {
        System.out.println("find book by id");
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findBookByNumberRecord(int numberRecord) {
        return bookRepository.findBookByNumberRecord(numberRecord);
    }

    @Override
    public List<Book> findBooksByAuthor(String author) {
        return bookRepository.findBooksByAuthor(author);
    }

    @Override
    public List<Book> findBookByNumberRecordSameAuthor(String author, int numberRecord) {
        return bookRepository.findBookByNumberRecordSameAuthor(author, numberRecord);
    }

    @Override
    public List<Book> findBookByNumberRecordSameCategory(String category, int numberRecord) {
        return bookRepository.findBookByNumberRecordSameCategory(category, numberRecord);
    }

    @Override
    public Page<Book> search(String book, Pageable page) {
        return bookRepository.search(book, page);
    }

    @Override
    public Page<Book> paginate( Pageable page) {
        return bookRepository.findAll(page);
    }

    @Override
    public List<Integer> findRandomBooksByCategoryIds(List<Integer> ids, int numberRecord) {
        return bookRepository.findRandomBooksByCategoryIds(ids, numberRecord);
    }

    @Override
    public List<Book> getBooksRecommend(String idBooks, int page, int size) {
        List<Integer> idsRecommend = cacheRecommend.getRecommend(idBooks);

        if (idsRecommend.isEmpty() || idsRecommend.size() < (page + 1) * size) {
            List<Integer> list = Arrays.asList(idBooks.split(",")).stream().map(s -> Integer.parseInt(s.trim())).collect(Collectors.toList());
            List<Integer> bookIdsRecommend = aiService.getRecommendation(list, (page + 1) * size);
            System.out.print("Get top k = ");
            System.out.println((page + 1) * size);
            System.out.print("Number elements recommend = ");
            System.out.println(bookIdsRecommend.size());
            cacheRecommend.setRecommend(idBooks, bookIdsRecommend);

            int maxElementRecommend = bookIdsRecommend.size();
            List<Integer> ids = bookIdsRecommend.subList(page * size, Math.min((page + 1) * size, maxElementRecommend));
            return this.findBookByIds(ids);
        }
        System.out.println("get from cache " + idBooks);
        int maxElementRecommend = idsRecommend.size();
        List<Integer> ids = idsRecommend.subList(page * size, Math.min((page + 1) * size, maxElementRecommend));
        return this.findBookByIds(ids);
    }

    @Override
    public List<Book> findBookByIds(List<Integer> ids) {
        return bookRepository.findByIdIn(ids);
    }
}
