package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "customer_profile")
@Getter
@Setter
public class CustomerProfile {

    @Id
    private int userAccountId;

    @OneToOne
    @JoinColumn(name = "user_account_id")
    @MapsId
    private Users userId;

   private String firstName;
   private String lastName;
   private String phoneNumber;
   private String address;
   private String city;
   private String state;

   @Column(nullable = true, length = 64)
   private String profilePhoto;

    public CustomerProfile() {
    }

    public CustomerProfile(int userAccountId, Users userId, String firstName, String lastName,
                           String phoneNumber, String address, String city, String state, String profilePhoto) {
        this.userAccountId = userAccountId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.state = state;
        this.profilePhoto = profilePhoto;
    }

    public CustomerProfile(Users savedUser) {
        this.userId = savedUser;
    }

    @Override
    public String toString() {
        return "CustomerProfile{" +
                "userAccountId=" + userAccountId +
                ", userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", profilePhoto='" + profilePhoto + '\'' +
                '}';
    }
}
