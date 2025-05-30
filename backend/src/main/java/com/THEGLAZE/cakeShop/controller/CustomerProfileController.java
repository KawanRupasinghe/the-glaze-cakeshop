package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.entity.CustomerProfile;
import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.exception.DuplicateEmailException;
import com.THEGLAZE.cakeShop.service.CustomerProfileService;
import com.THEGLAZE.cakeShop.service.EmailService;
import com.THEGLAZE.cakeShop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerProfileController {

    private final CustomerProfileService customerProfileService;
    private final UsersService usersService;
    private final EmailService emailService;

    @Autowired
    public CustomerProfileController(CustomerProfileService customerProfileService, UsersService usersService, EmailService emailService) {
        this.customerProfileService = customerProfileService;
        this.usersService = usersService;
        this.emailService = emailService;
    }

    @PostMapping("/customerProfile")
    public void saveCustomerProfile(@RequestBody CustomerProfile customerProfile) {
        Optional<CustomerProfile> existCustomer = customerProfileService.findCustomerProfileById(customerProfile.getUserAccountId());
        if(existCustomer.isPresent()){
            customerProfileService.saveCustomer(customerProfile);
            Optional<Users> existUser =usersService.getUserById(existCustomer.get().getUserAccountId());
            Map<String, Object> model = new HashMap<>();
            model.put("name", customerProfile.getFirstName() + " " + customerProfile.getLastName());
            if(existUser.isPresent()){
                emailService.sendEmail(existUser.get().getEmail(), "Welcome to The Glaze Shop!", model);
                System.out.println("Email sent");
            }

        }
    }

    @GetMapping("/customer/get")
    public int getTotalCustomers(){
        return customerProfileService.getTotalNumOfCustomers();
    }

}
