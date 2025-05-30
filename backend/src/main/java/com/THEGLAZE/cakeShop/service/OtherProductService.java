package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.OtherProductDto;
import com.THEGLAZE.cakeShop.entity.ProductsOther;
import com.THEGLAZE.cakeShop.repository.OtherProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OtherProductService {

    private final OtherProductsRepository otherProductsRepository;

    @Autowired
    public OtherProductService(OtherProductsRepository otherProductsRepository) {
        this.otherProductsRepository = otherProductsRepository;
    }

    public List<OtherProductDto> getAllProduct() {
        List<ProductsOther> otherProducts = otherProductsRepository.findAll();
        return otherProducts.stream().map(types ->  new OtherProductDto(
                types.getProductId(),
                types.getProductName(),
                types.getProductUnitPrice(),
                types.getProductImage()
        )).collect(Collectors.toList());
    }
}
