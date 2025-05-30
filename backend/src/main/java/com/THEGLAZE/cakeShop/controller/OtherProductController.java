package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.OtherProductDto;
import com.THEGLAZE.cakeShop.service.OtherProductService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/other")
@CrossOrigin(origins = "http://localhost:5173")
public class OtherProductController {

    private final OtherProductService otherProductService;

    @Autowired
    public OtherProductController(OtherProductService otherProductService) {
        this.otherProductService = otherProductService;
    }

    @GetMapping("/all")
    public List<OtherProductDto> getAll() {
        return otherProductService.getAllProduct();
    }
}
