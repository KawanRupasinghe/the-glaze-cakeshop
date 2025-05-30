package com.THEGLAZE.cakeShop.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OtherProductDto {
    private int productId;
    private String productName;
    private String productUnitPrice;
    private String productImage;

}
