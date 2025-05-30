package com.THEGLAZE.cakeShop.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CakeDto {
    private int productId;
    private String productName;
    private String productDescription;
    private String productImage;
    private String productPrice;
    private String productType;


}
