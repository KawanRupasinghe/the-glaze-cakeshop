package com.THEGLAZE.cakeShop.dto;

import jakarta.persistence.Column;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private int orderId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
    private String state;
    private String  postalCode;
    private String productDescription;
    private String totalPrice;
    private Date orderDate;
    private String paymentMethod;
    private String paymentStatus;
    private String orderStatus;
    private String orderReference;
}
