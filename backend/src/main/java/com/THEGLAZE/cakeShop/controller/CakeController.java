package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.CakeDto;
import com.THEGLAZE.cakeShop.entity.Quantity;
import com.THEGLAZE.cakeShop.service.CakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cake")
@CrossOrigin(origins = "http://localhost:5173")
public class CakeController {

    private final CakeService cakeService;

    @Autowired
    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping("/all")
    public List<CakeDto> getAllCakes() {
        return cakeService.findAll();
    }

    @GetMapping("/allPrices")
    public List<Quantity> getAllCakePrices() {
        return cakeService.getAllPrices();
    }
}
