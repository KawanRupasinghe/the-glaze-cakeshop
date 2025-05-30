package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.entity.CustomerProfile;
import com.THEGLAZE.cakeShop.repository.CustomerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerProfileService {

    public final CustomerProfileRepository customerProfileRepository;

    @Autowired
    public CustomerProfileService(CustomerProfileRepository customerProfileRepository) {
        this.customerProfileRepository = customerProfileRepository;
    }

    public Optional<CustomerProfile> findCustomerProfileById(int id) {
        return customerProfileRepository.findById(id);
    }

    public void saveCustomer(CustomerProfile customerProfile) {
        customerProfileRepository.save(customerProfile);
    }

    public int getTotalNumOfCustomers() {
        return (int) customerProfileRepository.count();
    }
}
