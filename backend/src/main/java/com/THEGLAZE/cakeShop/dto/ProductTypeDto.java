package com.THEGLAZE.cakeShop.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductTypeDto {
    private int productTypeId;
    private String productTypeName;
    private String imageUrl;
    private String priceInfo;
}
