package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.Quantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuantityRepository extends JpaRepository<Quantity, Integer> {
}
