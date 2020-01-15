package com.fooddelivery.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
public class Customer extends Person {

    @CreationTimestamp
    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate;

    public Customer() {
        super();
    }

    public Customer(String firstName, String lastName) {
        super(firstName, lastName);
    }

    public Customer(int id, String firstName, String lastName) {
        super(id, firstName, lastName);
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "registrationDate=" + registrationDate +
                "} " + super.toString();
    }
}
