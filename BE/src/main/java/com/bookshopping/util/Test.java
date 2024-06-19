package com.bookshopping.util;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

class Adder {
    static int add(int a, int b) {
        return a + b;
    }
    static double add(double a, int b) {
        return a + b;
    }
}
public class Test {
    public static void main(String[] args) {
        System.out.println(Adder.add(2, 3));
    }
}


