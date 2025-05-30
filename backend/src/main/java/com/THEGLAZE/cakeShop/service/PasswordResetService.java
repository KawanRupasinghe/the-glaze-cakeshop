package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.entity.PasswordResetCode;
import com.THEGLAZE.cakeShop.repository.PasswordResetCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {

    private final PasswordResetCodeRepository passwordResetCodeRepository;

    @Autowired
    public PasswordResetService(PasswordResetCodeRepository passwordResetCodeRepository) {
        this.passwordResetCodeRepository = passwordResetCodeRepository;
    }

    public void saveCode(String code) {
       PasswordResetCode passwordResetCode = new PasswordResetCode();
       passwordResetCode.setVerificationCode(code);
       passwordResetCodeRepository.save(passwordResetCode);
    }
}
