package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "product_other")
public class ProductsOther {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private String productUnitPrice;
    private String productImage;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productTypeId", referencedColumnName = "productTypeId")
    private ProductsType productTypeId;

    public ProductsOther() {
    }

    public ProductsOther(int productId, String productName, String productUnitPrice, String productImage, ProductsType productTypeId) {
        this.productId = productId;
        this.productName = productName;
        this.productUnitPrice = productUnitPrice;
        this.productImage = productImage;
        this.productTypeId = productTypeId;
    }
}
