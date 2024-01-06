/**
 * 
 */
package com.fleurshop.fleur.dto;

import com. fleurshop.fleur.entity.Customer;
import com. fleurshop.fleur.entity.Address;
import com. fleurshop.fleur.entity.Order;
import com. fleurshop.fleur.entity.OrderItem;

import java.util.Set;
import java.util.HashSet;

import lombok.Data;

/**
 * Purchase data transfer object
 */
@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
