package com.fooddelivery.controller;

import com.fooddelivery.model.Customer;
import com.fooddelivery.model.Order;
import com.fooddelivery.model.Product;
import com.fooddelivery.service.CustomerService;
import com.fooddelivery.service.OrderService;
import com.fooddelivery.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OrderController {

    private OrderService orderService;

    private ProductService productService;

    private CustomerService customerService;

    @Autowired
    public OrderController(OrderService orderService, ProductService productService, CustomerService customerService) {
        this.orderService = orderService;
        this.productService = productService;
        this.customerService = customerService;
    }

    @GetMapping("/orders")
    public Iterable<Order> allOrders(Model model){
        return orderService.allOrders();
    }

    @RequestMapping("/add/{customerId}/{productIds}")
    public Order addOrder(@PathVariable("customerId") int customerId, @PathVariable("productIds") int[] productIds){
        String status = "new";
        List<Product> productList = new ArrayList<>();
        Customer customer = customerService.getCustomerById(customerId);
        for (Product product: productService.allProducts()) {
            for (int productId : productIds) {
                if (product.getId() == productId){
                    productList.add(product);
                }
            }
        }
        return orderService.addOrder(new Order(status, customer, productList));
    }
}
