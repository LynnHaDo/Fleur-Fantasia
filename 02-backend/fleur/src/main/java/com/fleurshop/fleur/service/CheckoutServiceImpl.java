/**
 * 
 */
package com.fleurshop.fleur.service;

import com.fleurshop.fleur.dao.CustomerRepository;
import com.fleurshop.fleur.dto.Purchase;
import com.fleurshop.fleur.dto.PaymentInfo;
import com.fleurshop.fleur.dto.PurchaseResponse;

import com.fleurshop.fleur.entity.*;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;

import java.util.Set;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

/**
 * Implements CheckoutService
 */
@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;
    
    public CheckoutServiceImpl(CustomerRepository customerRepo, @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepository = customerRepo;
        Stripe.apiKey = secretKey;
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
        return new PurchaseResponse(orderTrackingNumber);
    }
    
    private String generateTrackingNumber() {
        // Generate a random UUID number
        return UUID.randomUUID().toString();
    }

    @Override 
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("receipt_email", paymentInfo.getEmail());
        params.put("description", "Fleur Fantasia Purchase");

        return PaymentIntent.create(params);
    }
}
