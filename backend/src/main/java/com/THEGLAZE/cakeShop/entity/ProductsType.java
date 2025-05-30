package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "product_type")
@Getter
@Setter
public class ProductsType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productTypeId;

    private String productTypeName;

    @Column(nullable = true, length = 64)
    private String imageUrl;

    private String priceInfo;

    @OneToMany(targetEntity = ProductsCake.class, mappedBy = "productTypeId", cascade = CascadeType.ALL)
    private List<ProductsCake> products;

    @OneToMany(targetEntity = ProductCupcake.class, mappedBy = "productTypeId", cascade = CascadeType.ALL)
    private List<ProductCupcake> cupcakes;

    @OneToMany(targetEntity = ProductsOther.class, mappedBy = "productTypeId", cascade = CascadeType.ALL)
    private List<ProductCupcake> otherProducts;

    public ProductsType() {
    }

    public ProductsType(int productTypeId, String productTypeName, List<ProductsCake> products) {
        this.productTypeId = productTypeId;
        this.productTypeName = productTypeName;
        this.products = products;
    }

    @Override
    public String toString() {
        return "ProductsType{" +
                "productTypeId=" + productTypeId +
                ", productTypeName='" + productTypeName + '\'' +
                '}';
    }
}
