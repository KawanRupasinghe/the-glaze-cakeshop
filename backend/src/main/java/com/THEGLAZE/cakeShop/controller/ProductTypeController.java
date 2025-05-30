package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.ProductTypeDto;
import com.THEGLAZE.cakeShop.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/productType")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductTypeController {

    private final ProductTypeService productTypeService;

    @Autowired
    public ProductTypeController( ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }

    @GetMapping("/all")
    public List<ProductTypeDto> getAllProductTypes() {
        return productTypeService.getProductTypes();
    }
}
