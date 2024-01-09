package com.fleurshop.fleur.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.fleurshop.fleur.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find by category
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    // Find by keyword
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
