package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "product_cake")
public class ProductsCake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private String productDescription;
    private String productImage;
    private String productPrice;
    private String productType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productTypeId", referencedColumnName = "productTypeId")
    private ProductsType productTypeId;

    public ProductsCake() {
    }

    public ProductsCake(int productId, String productName, String productDescription, String productPrice, ProductsType productTypeId) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productTypeId = productTypeId;
    }
}