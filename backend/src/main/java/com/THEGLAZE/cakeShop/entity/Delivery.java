package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "delivery")
@Getter
@Setter
@ToString
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deliveryId;
    private String customerName;
    private String customerAddress;

    @Column(columnDefinition = "TEXT")
    private String productDescription;
    private String totalPrice;
    private String paymentMethod;
    private String deliveryReference;
    private String deliveryStatus;
    private Integer orderId;

    public Delivery() {
    }

    public Delivery(int deliveryId, String customerName, String customerAddress, String productDescription, String totalPrice, String paymentMethod, String deliveryReference, Order orderId) {
        this.deliveryId = deliveryId;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.productDescription = productDescription;
        this.totalPrice = totalPrice;
        this.paymentMethod = paymentMethod;
        this.deliveryReference = deliveryReference;
        this.orderId = orderId.getOrderId();
    }
}
