package com.fooddelivery.controller;

import com.fooddelivery.model.Customer;
import com.fooddelivery.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/")
    public Iterable<Customer> allCustomers() {
        return customerService.allCustomers();
    }

    @RequestMapping("/{id}")
    public Customer getCustomerById(@PathVariable("id") int id) {
        return customerService.getCustomerById(id);
    }

    @RequestMapping("/{firstName}/{lastName}")
    public Customer addCustomer(@PathVariable("firstName") String firstName, @PathVariable("lastName") String lastName) {
        return customerService.addCustomer(firstName, lastName);
    }

    @RequestMapping("/unique-customers-by-last-names")
    public Set<Customer> getUniqueCustomerByLastNames() {
        return customerService.getUniqueCustomerByLastNames();
    }

    @RequestMapping("/sorted-customers-by-last-names")
    public Set<Customer> getSortedUniqueCustomerLastNames() {
        return customerService.getSortedUniqueCustomerByLastNames();
    }

    @DeleteMapping("/{id}")
    public void deleteCustomerById(@PathVariable int id) {
        customerService.deleteCustomerById(id);
    }
}
