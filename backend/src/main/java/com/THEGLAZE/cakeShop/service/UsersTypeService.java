package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.entity.UsersType;
import com.THEGLAZE.cakeShop.repository.UsersTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersTypeService {
    private final UsersTypeRepository usersTypeRepository;

    @Autowired
    public UsersTypeService(UsersTypeRepository usersTypeRepository) {
        this.usersTypeRepository = usersTypeRepository;
    }

    public UsersType findUserTypeByName(String typeName) {
       return usersTypeRepository.findUserTypeByUserTypeName(typeName).orElseThrow(
                () ->new RuntimeException("User type not found" + typeName));
    }
}
