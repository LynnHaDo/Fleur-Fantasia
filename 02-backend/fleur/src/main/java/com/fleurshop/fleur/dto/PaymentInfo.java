/**
 * 
 */
package com.fleurshop.fleur.dto;

import lombok.Data;

/**
 * Payment info data transfer object
 */
@Data
public class PaymentInfo {
    private int amount;
    private String currency;
    private String email;
}
