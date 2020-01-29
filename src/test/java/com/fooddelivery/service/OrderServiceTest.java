package com.fooddelivery.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Test
    void shouldReturnCustomerFirstNameOfOrder() {
        String firstName = orderService.findOrderById(2).get().getCustomer().getFirstName();
        assertEquals("heodore", firstName);
    }
}
