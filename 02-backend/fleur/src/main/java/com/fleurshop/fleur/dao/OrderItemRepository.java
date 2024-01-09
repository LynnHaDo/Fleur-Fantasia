package com.fleurshop.fleur.dao;

import com.fleurshop.fleur.entity.OrderItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Order Item JPA Repo
 */
@RepositoryRestResource(collectionResourceRel = "orderItems", path = "order-items")
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{
    Page<OrderItem> findByOrderId(@Param("id") Long id, Pageable pageable);
}
