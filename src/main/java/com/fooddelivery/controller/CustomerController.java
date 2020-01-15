package com.fooddelivery.controller;

import com.fooddelivery.model.Customer;
import com.fooddelivery.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/customers")
    public Iterable<Customer> allCustomers() {
        return customerService.allCustomers();
    }

    @RequestMapping("/customer/{firstName}/{lastName}")
    public Customer addCustomer(@PathVariable("firstName") String firstName, @PathVariable("lastName") String lastName) {
        return customerService.addCustomer(firstName, lastName);
    }

    @GetMapping("/unique")
    public Set<Customer> getUniqueCustomerLastNames() {
        return customerService.getUniqueCustomerLastNames();
    }

    @GetMapping("/sorted")
    public Set<Customer> getSortedUniqueCustomerLastNames() {
        return customerService.getSortedUniqueCustomerLastNames();
    }
}
