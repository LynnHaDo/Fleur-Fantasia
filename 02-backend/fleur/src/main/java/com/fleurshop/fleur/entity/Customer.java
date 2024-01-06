/**
 * 
 */
package com.fleurshop.fleur.entity;

import java.util.Set;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Customer entity
 */
@Entity
@Table(name="customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    
    @Column(name="first_name")
    private String firstName;
    
    @Column(name="last_name")
    private String lastName;
    
    @Column(name="email")
    private String email;
    
    @Column(name="phone_number")
    private String phoneNumber;
    
    @OneToMany(mappedBy="customer", cascade = CascadeType.ALL)
    private Set<Order> orders = new HashSet<>();
    
    public void add(Order order) {
        if (order != null) {
            if (orders == null) {
                orders = new HashSet<>();
            }
            
            orders.add(order);
            order.setCustomer(this);
        }
    }
}
