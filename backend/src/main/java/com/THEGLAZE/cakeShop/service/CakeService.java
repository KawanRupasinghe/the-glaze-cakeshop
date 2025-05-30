package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.CakeDto;
import com.THEGLAZE.cakeShop.entity.ProductsCake;
import com.THEGLAZE.cakeShop.entity.Quantity;
import com.THEGLAZE.cakeShop.repository.ProductsCakeRepository;
import com.THEGLAZE.cakeShop.repository.QuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CakeService {
    private final ProductsCakeRepository productsCakeRepository;
    private final QuantityRepository quantityRepository;

    @Autowired
    public CakeService(ProductsCakeRepository productsCakeRepository, QuantityRepository quantityRepository) {
        this.productsCakeRepository = productsCakeRepository;
        this.quantityRepository = quantityRepository;
    }

    public List<CakeDto> findAll() {
        List<ProductsCake> cakeList = productsCakeRepository.findAll();
        return cakeList.stream().map(types -> new CakeDto(
                types.getProductId(),
                types.getProductName(),
                types.getProductDescription(),
                types.getProductImage(),
                types.getProductPrice(),
                types.getProductType()
        )).collect(Collectors.toList());
    }

    public List<Quantity> getAllPrices() {
       return quantityRepository.findAll();
    }
}
