package com.THEGLAZE.cakeShop.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class VerificationCodeService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;
    private static final SecureRandom random = new SecureRandom();

    public String generateVerificationCode() {
        StringBuilder verificationCode = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomChar = random.nextInt(CHARACTERS.length());
            verificationCode.append(CHARACTERS.charAt(randomChar));

        }
        return verificationCode.toString();
    }


}
