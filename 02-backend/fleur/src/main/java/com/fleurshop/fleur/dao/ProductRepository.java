package com.fleurshop.fleur.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fleurshop.fleur.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
