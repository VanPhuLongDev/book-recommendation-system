package com.bookshopping.util;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class RecommendCacheService {
    private static final Integer EXPIRE_MIN = 4;
    private LoadingCache<String, List<Integer>> recommendCache;

    public RecommendCacheService(){
        super();
        recommendCache = CacheBuilder.newBuilder().
                expireAfterWrite(EXPIRE_MIN, TimeUnit.MINUTES)
                .build(new CacheLoader<String, List<Integer>>() {
                    public List<Integer> load(String key) {
                        return new ArrayList<>();
                    }
                });
    }

    public void setRecommend(String key, List<Integer> bookIds){
        recommendCache.put(key, bookIds);
    }

    public List<Integer> getRecommend(String key){
        try{
            return recommendCache.get(key);
        } catch (Exception e){
            return new ArrayList<>();
        }
    }
}
