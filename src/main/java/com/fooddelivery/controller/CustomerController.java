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

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customer")
    public Iterable<Customer> allCustomers() {
        return customerService.allCustomers();
    }

    @GetMapping("/customer/{id}")
    public Customer getCustomerById(@PathVariable("id") int id) {
        return customerService.getCustomerById(id);
    }

    @RequestMapping("/customer/{firstName}/{lastName}")
    public Customer addCustomer(@PathVariable("firstName") String firstName, @PathVariable("lastName") String lastName) {
        return customerService.addCustomer(firstName, lastName);
    }

    @GetMapping("customer/unique")
    public Set<Customer> getUniqueCustomerByLastNames() {
        return customerService.getUniqueCustomerByLastNames();
    }

    @GetMapping("customer/sorted")
    public Set<Customer> getSortedUniqueCustomerLastNames() {
        return customerService.getSortedUniqueCustomerByLastNames();
    }
}
