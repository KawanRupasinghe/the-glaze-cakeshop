package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.ProductCupcake;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CupcakeRepository extends JpaRepository<ProductCupcake, Integer> {
}
