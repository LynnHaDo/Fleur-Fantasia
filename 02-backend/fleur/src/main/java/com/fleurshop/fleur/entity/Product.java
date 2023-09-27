package com.fleurshop.fleur.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;
    
    @Column(name="sku")
    private String sku;
    
    @Column(name="name")
    private String name;
    
    @Column(name="description")
    private String description;
    
    @Column(name="unit_price")
    private Double unitPrice;
    
    @Column(name="image_url")
    private String imageUrl;
    
    @Column(name="active")
    private boolean active;
    
    @Column(name="units_in_stock")
    private int unitsInStock;
    
    @Column(name="date_created")
    @CreationTimestamp
    private String dateCreated;
    
    @Column(name="last_updated")
    @UpdateTimestamp
    private String lastUpdated;

}
