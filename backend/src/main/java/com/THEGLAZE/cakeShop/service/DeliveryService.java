package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.entity.Delivery;
import com.THEGLAZE.cakeShop.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final VerificationCodeService verificationCodeService;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository, VerificationCodeService verificationCodeService) {
        this.deliveryRepository = deliveryRepository;
        this.verificationCodeService = verificationCodeService;
    }

    public Delivery saveDelivery(Delivery delivery){
        String deliveryReference = verificationCodeService.generateVerificationCode();
        delivery.setDeliveryReference(deliveryReference);
        delivery.setDeliveryStatus("Pending");
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getAllOrders() {
        return deliveryRepository.findAll();
    }


    public void updateDelivery(Delivery delivery) {
        Optional<Delivery> optionalDelivery  = deliveryRepository.findById(delivery.getDeliveryId());
        if (optionalDelivery.isPresent()) {
            Delivery delivery1 = optionalDelivery.get();
            delivery1.setDeliveryStatus(delivery.getDeliveryStatus());
            deliveryRepository.save(delivery1);
        } else {
            throw new RuntimeException("Delivery not found with ID: " + delivery.getDeliveryId());
        }
    }
}
