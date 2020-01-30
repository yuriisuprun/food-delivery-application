package com.fooddelivery.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "customers")
public class Customer extends Person {

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate;

    @OneToMany
    private List<Order> orders;

    public Customer() {
    }

    public Customer(String firstName, String lastName) {
        super(firstName, lastName);
    }

    public Customer(int id, String firstName, String lastName) {
        super(id, firstName, lastName);
    }

    public Customer(int id, String firstName, String lastName, LocalDateTime registrationDate, List<Order> orders) {
        super(id, firstName, lastName);
        this.registrationDate = registrationDate;
        this.orders = orders;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "registrationDate=" + registrationDate +
                ", orders=" + orders +
                "} " + super.toString();
    }
}
