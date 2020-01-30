package com.fooddelivery.service;

import com.fooddelivery.model.Customer;
import com.fooddelivery.repository.CustomerRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CustomerServiceTest {

	@InjectMocks
	private CustomerService customerService;

	@Mock
	private CustomerRepository customerRepository;

	private Customer customer;

	@Before
	public void setUp() {
		customer = new Customer("Jimmy", "Carter");
	}

	/*@Test
	void shouldReturnCustomerLastName() {
		String lastName = customerService.getCustomerById(1).getLastName();
		assertEquals("Carter", lastName);
	}*/

	@Test
	public void shouldAddCustomer() {
		when(customerRepository.save(customer)).thenReturn(any(Customer.class));
		customerService.addCustomer("Jimmy", "Carter");
		verify(customerRepository).save(customer);
	}
}
