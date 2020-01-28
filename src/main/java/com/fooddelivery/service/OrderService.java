package com.fooddelivery.service;

import com.fooddelivery.exception.OrdersNotFoundException;
import com.fooddelivery.model.Order;
import com.fooddelivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Iterable<Order> findAllOrders() {
        try {
            if (orderRepository.findAll() == null) {
                throw new OrdersNotFoundException();
            }
        } catch (OrdersNotFoundException e) {
            System.out.println("No Order Found Here...");
        }
        return orderRepository.findAll();
    }

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    public Optional<Order> findOrderById(int id) {
        return orderRepository.findById(id);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }
}
