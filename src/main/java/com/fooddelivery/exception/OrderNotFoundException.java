package com.fooddelivery.exception;

public class OrderNotFoundException extends Exception {

    public OrderNotFoundException(int id) {
        super("Order " + id + " not found!");
    }
}
