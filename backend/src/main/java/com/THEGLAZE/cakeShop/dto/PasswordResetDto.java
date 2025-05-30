package com.THEGLAZE.cakeShop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PasswordResetDto {
    private String email;
    private String verificationCode;
    private String password;
}
