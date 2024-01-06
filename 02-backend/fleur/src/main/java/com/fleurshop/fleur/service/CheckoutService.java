/**
 * 
 */
package com.fleurshop.fleur.service;

import com.fleurshop.fleur.dto.Purchase;
import com.fleurshop.fleur.dto.PurchaseResponse;

/**
 * 
 */
public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
