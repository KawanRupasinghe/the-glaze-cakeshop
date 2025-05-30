package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Integer> {
}

