package com.THEGLAZE.cakeShop.repository;

import com.THEGLAZE.cakeShop.entity.PasswordResetCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode,Integer> {
    Optional<PasswordResetCode> findByVerificationCode(String verificationCode);

}
