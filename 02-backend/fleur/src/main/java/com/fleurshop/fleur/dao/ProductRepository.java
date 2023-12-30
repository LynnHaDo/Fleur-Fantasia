package com.fleurshop.fleur.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.fleurshop.fleur.entity.Product;

@CrossOrigin("http://localhost:4200") // Accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find by category
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    // Find by keyword
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
