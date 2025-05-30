package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.PasswordResetDto;
import com.THEGLAZE.cakeShop.entity.CustomerProfile;
import com.THEGLAZE.cakeShop.entity.PasswordResetCode;
import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.exception.DuplicateEmailException;
import com.THEGLAZE.cakeShop.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {

    private final UsersService usersService;
    private final EmailService emailService;
    private final VerificationCodeService verificationCodeService;
    private final CustomerProfileService customerProfileService;
    private final PasswordResetService passwordResetService;


    @Autowired
    public UsersController(UsersService usersService, EmailService emailService, VerificationCodeService verificationCodeService, CustomerProfileService customerProfileService, PasswordResetService passwordResetService) {
        this.usersService = usersService;
        this.emailService = emailService;
        this.verificationCodeService = verificationCodeService;
        this.customerProfileService = customerProfileService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/customer")
    public int addNewUser(@Valid @RequestBody Users user) {
        Optional<Users> registeredUsers = usersService.getUserByEmail(user.getEmail());
        if(registeredUsers.isPresent()){
          throw new DuplicateEmailException("You are already registered with the provided email: " + user.getEmail());
        }else{
            int userId = usersService.addNew(user);
            System.out.println(userId);
            return userId;
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            Object currentUser = usersService.getCurrentUserProfile();
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }
            return ResponseEntity.ok(currentUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @PostMapping("/code")
    public ResponseEntity<String> sendVerificationCode(@RequestBody PasswordResetDto passwordResetDto) {
        Optional<Users> registeredUsers = usersService.getUserByEmail(passwordResetDto.getEmail());

        if (registeredUsers.isPresent()) {
            int userId = registeredUsers.get().getUserId();
            Optional<CustomerProfile> profile = customerProfileService.findCustomerProfileById(userId);

            if (profile.isPresent()) {
                Map<String, Object> model = new HashMap<>();
                String name = profile.get().getFirstName() + " " + profile.get().getLastName();
                String code = verificationCodeService.generateVerificationCode();
                passwordResetService.saveCode(code);

                model.put("name", name);
                model.put("verificationCode", code);
                emailService.sendVerificationEmail(passwordResetDto.getEmail(), "Verification Code", model);

                return ResponseEntity.ok("Verification Code sent successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have an account with this email");
        }
    }


    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody PasswordResetDto passwordResetDto) {
        Optional<PasswordResetCode> code = usersService.verifyCode(passwordResetDto.getVerificationCode());
        if(code.isPresent()){
            return ResponseEntity.ok("Verified");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid verification code");
        }
    }

    @PutMapping("/customer")
    public ResponseEntity<String> updatePassword(@Valid @RequestBody PasswordResetDto passwordResetDto) {
        Optional<Users> user = usersService.getUserByEmail(passwordResetDto.getEmail());
        if(user.isPresent()){
            usersService.updatePassword(passwordResetDto);
            return ResponseEntity.ok("Password updated successfully");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Update failed");
        }

    }
}
