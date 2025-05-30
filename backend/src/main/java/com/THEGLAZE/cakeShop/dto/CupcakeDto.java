package com.THEGLAZE.cakeShop.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CupcakeDto {
    private int productId;
    private String productName;
    private String productFlavour;
    private String productPrice;
    private String productImage;
}
