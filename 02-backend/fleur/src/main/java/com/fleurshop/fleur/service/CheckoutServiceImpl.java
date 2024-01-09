/**
 * 
 */
package com.fleurshop.fleur.service;

import com.fleurshop.fleur.dao.CustomerRepository;
import com.fleurshop.fleur.dto.Purchase;
import com.fleurshop.fleur.dto.PurchaseResponse;

import com.fleurshop.fleur.entity.*;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Set;
import java.util.UUID;

/**
 * Implements CheckoutService
 */
@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;
    
    public CheckoutServiceImpl(CustomerRepository customerRepo) {
        this.customerRepository = customerRepo;
    }
    
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        
        // retrieve order info from dto
        Order order = purchase.getOrder();
        
        // generate tracking number
        String orderTrackingNumber = this.generateTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        
        // populate order with order items
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        
        // populate order with shipping & billing addresses
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        
        // populate customer with order
        Customer customer = purchase.getCustomer();
        
        // check if customer already exists in the database through querying the email
        Customer customerDB = customerRepository.findByEmail(customer.getEmail());
        
        if (customerDB != null) {
            customer = customerDB;
        }
        
        customer.add(order);
        
        // save to the database
        customerRepository.save(customer);
        
        // return a response
        System.out.println("running");
        return new PurchaseResponse(orderTrackingNumber);
    }
    
    private String generateTrackingNumber() {
        // Generate a random UUID number
        return UUID.randomUUID().toString();
    }
}
