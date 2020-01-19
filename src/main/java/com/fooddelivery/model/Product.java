package com.fooddelivery.model;

import java.math.BigDecimal;
import java.util.List;

public class Product {

    private int id;
    private String name;
    private BigDecimal price;
    private List<Order> orders;
}
