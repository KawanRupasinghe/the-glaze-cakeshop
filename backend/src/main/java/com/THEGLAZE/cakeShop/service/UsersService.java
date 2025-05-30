package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.CustomerProfileDto;
import com.THEGLAZE.cakeShop.dto.PasswordResetDto;
import com.THEGLAZE.cakeShop.dto.ShopOwnerProfileDto;
import com.THEGLAZE.cakeShop.entity.CustomerProfile;
import com.THEGLAZE.cakeShop.entity.PasswordResetCode;
import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.entity.UsersType;
import com.THEGLAZE.cakeShop.repository.CustomerProfileRepository;
import com.THEGLAZE.cakeShop.repository.PasswordResetCodeRepository;
import com.THEGLAZE.cakeShop.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final UsersTypeService usersTypeService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetCodeRepository passwordResetCodeRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository, CustomerProfileRepository customerProfileRepository, UsersTypeService usersTypeService, PasswordEncoder passwordEncoder, PasswordResetCodeRepository passwordResetCodeRepository) {
        this.usersRepository = usersRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.usersTypeService = usersTypeService;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetCodeRepository = passwordResetCodeRepository;
    }

    public int addNew(Users user) {
        user.setActive(true);
        user.setRegistrationDate(new Date(System.currentTimeMillis()));
        UsersType customerType = usersTypeService.findUserTypeByName("Customer");
        user.setUserTypeId(customerType);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Users savedUser = usersRepository.save(user);

        if(customerType.getUserTypeId() == 1){
            customerProfileRepository.save(new CustomerProfile(savedUser));
        }

        return savedUser.getUserId();
    }

    public Optional<Users> getUserByEmail(String email) {
        return usersRepository.findUserByEmail(email);
    }

    public Optional<Users> getUserById(int userId) {
        return usersRepository.findById(userId);
    }

    public Object getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users users = usersRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Could not find user"));
        int userId = users.getUserId();

        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("Customer"))) {
            CustomerProfile customerProfile = customerProfileRepository.findById(userId).orElse(new CustomerProfile());
            return new CustomerProfileDto(
                    customerProfile.getUserAccountId(),
                    customerProfile.getFirstName(),
                    customerProfile.getLastName(),
                    customerProfile.getPhoneNumber(),
                    users.getEmail(),
                    customerProfile.getAddress(),
                    customerProfile.getCity(),
                    customerProfile.getState()
            );
        } else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("Shop Owner"))) {
            // Assuming ShopOwnerProfile exists or using basic user data
            return new ShopOwnerProfileDto(
                    users.getUserId() ,
                    users.getEmail(),
                    users.getRegistrationDate()
            );
        }
        return null;
    }

    public void updatePassword(PasswordResetDto passwordResetDto) {
       Optional<Users> optionalUsers = usersRepository.findUserByEmail(passwordResetDto.getEmail());
      if (optionalUsers.isPresent()) {
          Users user = optionalUsers.get();
          user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword()));
          usersRepository.save(user);
      }
    }

    public Optional<PasswordResetCode> verifyCode(String verificationCode) {
        return passwordResetCodeRepository.findByVerificationCode(verificationCode);
    }
}
