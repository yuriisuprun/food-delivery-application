package com.fooddelivery.service;

import com.fooddelivery.repository.CustomerRepository;
import com.fooddelivery.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

//@ExtendWith(MockitoJUnitRunner.class)
class CustomerServiceTest {

	@InjectMocks
	private CustomerService customerService;

	@Mock
	private CustomerRepository customerRepository;

	@Test
	void shouldReturnCustomerLastName() {
		String lastName = customerService.getCustomerById(1).getLastName();
		assertEquals("Carter", lastName);
	}

	/*@Test
	public void should() {
		locationService.save(location);
		Mockito
				.verify(locationRepository, Mockito.atLeastOnce())
				.save(location);
	}*/
}
