package com.THEGLAZE.cakeShop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(unique = true)
    private String email;

    @NotEmpty
    private String password;

    private boolean isActive;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date registrationDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userTypeId", referencedColumnName = "userTypeId")
    private UsersType userTypeId;

    @OneToMany(targetEntity = Order.class, mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Order> orders;

    public Users() {
    }

    public Users(int userId, String email, boolean isActive, Date registrationDate, UsersType userTypeID) {
        this.userId = userId;
        this.email = email;
        this.isActive = isActive;
        this.registrationDate = registrationDate;
        this.userTypeId = userTypeID;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", isActive=" + isActive +
                ", registrationDate=" + registrationDate +
                ", userTypeID=" + userTypeId +
                '}';
    }
}
