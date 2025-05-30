package com.THEGLAZE.cakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ShopOwnerProfileDto {

    private int userAccountId;
    private String email;
    private Date registrationDate;
}
