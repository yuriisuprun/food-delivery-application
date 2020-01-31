package com.fooddelivery.exception;

public class OrderNotFoundException extends Exception {

    public OrderNotFoundException() {
        super("Order not found!");
    }
}
