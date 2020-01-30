package com.fooddelivery.service;

import com.fooddelivery.model.Customer;
import com.fooddelivery.repository.CustomerRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CustomerServiceTest {

	@InjectMocks
	private CustomerService customerService;

	@Mock
	private CustomerRepository customerRepository;

	private Customer customer1;
	private Customer customer2;
	private Customer customer3;
	List<Customer> customers;

	@Before
	public void setUp() {
		customer1 = new Customer(1, "Jimmy", "Carter");
		customer2 = new Customer(2, "Theodore", "Roosevelt");
		customer3 = new Customer(3, "Harry", "Truman");

		customers = new ArrayList<Customer>();
		customers.add(customer1);
		customers.add(customer2);
		customers.add(customer3);
	}

	@Test
	public void shouldFindCustomerById() {
		when(customerRepository.findById(3)).thenReturn(java.util.Optional.of(new Customer("Harry", "Truman")));

		Customer customer = customerRepository.findById(3).get();

		assertEquals("Harry", customer.getFirstName());
		assertEquals("Truman", customer.getLastName());
	}

	@Test
	public void shouldAddCustomer() {
		when(customerRepository.save(customer1)).thenReturn(any(Customer.class));

		customerService.addCustomer("Jimmy", "Carter");

		verify(customerRepository).save(customer1);
	}

	@Test
	public void shouldFindAllEmployees() {
		when(customerRepository.findAll()).thenReturn(customers);

		List<Customer> customerList = (List<Customer>) customerService.allCustomers();

		assertEquals(3, customerList.size());
		verify(customerRepository, times(1)).findAll();
	}
}
