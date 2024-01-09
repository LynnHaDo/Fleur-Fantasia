/**
 * 
 */
package com.fleurshop.fleur.dao;

import com.fleurshop.fleur.entity.Order;
import com.fleurshop.fleur.entity.OrderItem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Order JPA Repo
 */
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long>{
    Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable);
}
