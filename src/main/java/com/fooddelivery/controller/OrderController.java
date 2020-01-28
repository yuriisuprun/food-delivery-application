package com.fooddelivery.controller;

import com.fooddelivery.model.Customer;
import com.fooddelivery.model.Order;
import com.fooddelivery.model.Product;
import com.fooddelivery.service.CustomerService;
import com.fooddelivery.service.OrderService;
import com.fooddelivery.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/order")
    public Iterable<Order> findAllOrders(Model model) {
        return orderService.findAllOrders();
    }

    @RequestMapping("/order/{customerId}/{productIds}")
    public Order addOrder(@PathVariable("customerId") int customerId, @PathVariable("productIds") int[] productIds) {
        String status = "new";
        List<Product> productList = new ArrayList<>();
        Customer customer = customerService.getCustomerById(customerId);
        for (Product product : productService.allProducts()) {
            for (int productId : productIds) {
                if (product.getId() == productId) {
                    productList.add(product);
                }
            }
        }
        return orderService.addOrder(new Order(status, customer, productList));
    }

    @PutMapping("/employees/{id}")
    public Order updateOrder(@RequestBody Order order, @PathVariable int id) {

        return orderService.findOrderById(id)
                .map(employee -> {
                    order.setStatus(order.getStatus());
                    order.setProducts(order.getProducts());
                    return orderService.addOrder(order);
                })
                .orElseGet(() -> {
                    order.setId(id);
                    return orderService.addOrder(order);
                });
    }

    @DeleteMapping("/order/{customerId}")
    public void deleteOrder(@PathVariable("customerId") int id) {
        orderService.deleteOrder(id);
    }
}
