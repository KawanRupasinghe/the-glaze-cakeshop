package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "product_cupcake")
public class ProductCupcake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String productName;
    private String productFlavour;
    private String productPrice;
    private String productImage;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productTypeId", referencedColumnName = "productTypeId")
    private ProductsType productTypeId;

    public ProductCupcake() {
    }

    public ProductCupcake(int productId, String productName, String productFlavour, String productPrice, String productImage, ProductsType productTypeId) {
        this.productId = productId;
        this.productName = productName;
        this.productFlavour = productFlavour;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.productTypeId = productTypeId;
    }
}
