package com.fooddelivery.service;

import com.fooddelivery.exception.OrdersNotFoundException;
import com.fooddelivery.model.Order;
import com.fooddelivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Iterable<Order> allOrders() {
        try {
            if(orderRepository.findAll() == null){
                throw new OrdersNotFoundException();
            }
        } catch (OrdersNotFoundException e) {
            System.out.println("No Order Found Here...");
        }
        return orderRepository.findAll();
    }
}
