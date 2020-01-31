package com.fooddelivery.service;

import com.fooddelivery.exception.CustomerNotFoundException;
import com.fooddelivery.model.Customer;
import com.fooddelivery.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Iterable<Customer> allCustomers(){
        return customerRepository.findAll();
    }

    public Customer addCustomer(String firstName, String lastName){
        return customerRepository.save(new Customer(firstName, lastName));
    }

    public Set<Customer> getUniqueCustomerByLastNames() {
        Set<Customer> customerSet = new HashSet<>();
        customerRepository.findAll().forEach(customerSet::add);
        return customerSet;
    }

    public Set<Customer> getSortedUniqueCustomerByLastNames() {
        Set<Customer> customerSet = new HashSet<>();
        customerRepository.findAll().forEach(customerSet::add);
        return new TreeSet<>(customerSet);
    }

    public Customer getCustomerById(int id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));
    }

    public void deleteCustomerById(int id) {
        customerRepository.deleteById(id);
    }
}
