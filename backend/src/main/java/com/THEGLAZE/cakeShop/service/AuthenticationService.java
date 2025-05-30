package com.THEGLAZE.cakeShop.service;


import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.util.CustomUserDetails;
import com.THEGLAZE.cakeShop.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UsersRepository userRepository;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UsersRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }


    public UserDetails authenticate(Users input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findUserByEmail(input.getEmail())
                .map(CustomUserDetails::new)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

}