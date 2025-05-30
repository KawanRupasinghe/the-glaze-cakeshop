package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.CupcakeDto;
import com.THEGLAZE.cakeShop.service.CupcakeService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cupcake")
@CrossOrigin(origins = "http://localhost:5173")
public class CupcakeController {

    private final CupcakeService cupcakeService;

    @Autowired
    public CupcakeController(CupcakeService cupcakeService) {
        this.cupcakeService = cupcakeService;
    }

    @GetMapping("/all")
    public List<CupcakeDto> getAllCupcake() {
        return cupcakeService.getAllCupcakes();
    }
}
