/**
 * 
 */
package com.fleurshop.fleur.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * State entity
 */

@Entity
@Table(name="state")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="name")
    private String name;
    
    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;
    
    // Set up many-to-one with country
}
