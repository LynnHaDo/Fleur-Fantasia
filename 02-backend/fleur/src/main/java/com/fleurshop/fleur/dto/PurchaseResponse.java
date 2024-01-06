/**
 * 
 */
package com.fleurshop.fleur.dto;

import lombok.Data;

/**
 * Purchase response data transfer object
 */
public class PurchaseResponse {
    private String orderTrackingNumber;
    
    public PurchaseResponse(String trknumber) {
        this.orderTrackingNumber = trknumber;
    }
}
