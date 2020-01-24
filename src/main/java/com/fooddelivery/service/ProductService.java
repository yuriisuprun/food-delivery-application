package com.fooddelivery.service;

import com.fooddelivery.model.Product;
import com.fooddelivery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Product> allProducts(){
        return productRepository.findAll();
    }
}
