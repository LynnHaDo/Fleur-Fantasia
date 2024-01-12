/**
 * 
 */
package com.fleurshop.fleur.service;

import com.fleurshop.fleur.dto.Purchase;
import com.fleurshop.fleur.dto.PaymentInfo;
import com.fleurshop.fleur.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;


/**
 * Process purchase 
 */
public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
