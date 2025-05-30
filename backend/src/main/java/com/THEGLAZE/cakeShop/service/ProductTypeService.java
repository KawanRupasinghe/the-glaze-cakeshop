package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.ProductTypeDto;
import com.THEGLAZE.cakeShop.entity.ProductsType;
import com.THEGLAZE.cakeShop.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductTypeService(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    public List<ProductTypeDto> getProductTypes() {
        List<ProductsType> productTypes = productTypeRepository.findAll();
        return productTypes.stream().map(types -> new ProductTypeDto(
                types.getProductTypeId(),
                types.getProductTypeName(),
                types.getImageUrl(),
                types.getPriceInfo()
        )).collect(Collectors.toList());
    }
}
