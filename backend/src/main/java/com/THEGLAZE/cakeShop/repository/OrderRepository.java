package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
