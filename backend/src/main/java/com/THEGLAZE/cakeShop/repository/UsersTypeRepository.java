package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.UsersType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersTypeRepository extends JpaRepository<UsersType,Integer> {
   Optional<UsersType> findUserTypeByUserTypeName(String typeName);
}
