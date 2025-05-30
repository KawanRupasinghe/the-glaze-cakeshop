package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.ProductsType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductsType, Integer> {
}
