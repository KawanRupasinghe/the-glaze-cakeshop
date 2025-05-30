package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
   Optional<Users> findUserByEmail(String email);
}
