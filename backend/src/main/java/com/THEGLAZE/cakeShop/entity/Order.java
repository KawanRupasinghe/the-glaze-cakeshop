package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
    private String state;
    private String  postalCode;

    @Column(columnDefinition = "TEXT")
    private String productDescription;
    private String paymentReceipt;
    private String totalPrice;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date orderDate;
    private String paymentMethod;
    private String paymentStatus;
    private String orderStatus;
    private String orderReference;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private Users userId;

    public Order() {
    }

}
