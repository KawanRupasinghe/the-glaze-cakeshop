package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.entity.Delivery;
import com.THEGLAZE.cakeShop.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/add")
    public Delivery saveOrder(@RequestBody Delivery delivery){
        return deliveryService.saveDelivery(delivery);
    }

    @GetMapping("/all")
    public List<Delivery> getAllDeliveries(){
        return deliveryService.getAllOrders();
    }

    @PutMapping("/update")
    public void updateDelivery(@RequestBody Delivery delivery){
        deliveryService.updateDelivery(delivery);
    }
}
