/**
 * 
 */
package com.fleurshop.fleur.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Country entity
 */

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="code")
    private String code;
    
    @Column(name="name")
    private String name;
    
    // Set up one-to-many with state
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;
}
