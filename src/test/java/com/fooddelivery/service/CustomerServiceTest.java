package com.fooddelivery.service;

import com.fooddelivery.model.Customer;
import com.fooddelivery.repository.CustomerRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
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

	@Before
	public void setUp() {
		customer1 = new Customer("Jimmy", "Carter");
		customer1.setId(1);
		customer2 = new Customer("Theodore", "Roosevelt");
		customer2.setId(2);
		customer3 = new Customer("Harry", "Truman");
		customer3.setId(3);
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
}
