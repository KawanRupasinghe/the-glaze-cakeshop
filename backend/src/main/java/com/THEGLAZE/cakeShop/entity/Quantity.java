package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "cake_quantity_type")
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quantityId;
    private String quantity;
    private String quantityPrice;

    public Quantity() {
    }

    public Quantity(int quantityId, String quantity) {
        this.quantityId = quantityId;
        this.quantity = quantity;
    }
}
