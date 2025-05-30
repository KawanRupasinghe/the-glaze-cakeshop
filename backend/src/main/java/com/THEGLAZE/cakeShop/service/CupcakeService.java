package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.CupcakeDto;
import com.THEGLAZE.cakeShop.entity.ProductCupcake;
import com.THEGLAZE.cakeShop.repository.CupcakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CupcakeService {

    private final CupcakeRepository cupcakeRepository;

    @Autowired
    public CupcakeService(CupcakeRepository cupcakeRepository) {
        this.cupcakeRepository = cupcakeRepository;
    }

    public List<CupcakeDto> getAllCupcakes() {
        List<ProductCupcake> cupcakes = cupcakeRepository.findAll();
        return  cupcakes.stream().map(types-> new CupcakeDto(
                types.getProductId(),
                types.getProductName(),
                types.getProductFlavour(),
                types.getProductPrice(),
                types.getProductImage()
        )).collect(Collectors.toList());
    }
}
