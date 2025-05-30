package com.THEGLAZE.cakeShop.service;

import com.THEGLAZE.cakeShop.dto.OrderDto;
import com.THEGLAZE.cakeShop.entity.Order;
import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UsersService usersService;
    private final VerificationCodeService verificationCodeService;
    private final EmailService emailService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UsersService usersService, VerificationCodeService verificationCodeService, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.usersService = usersService;
        this.verificationCodeService = verificationCodeService;
        this.emailService = emailService;
    }

    public int addNewOrder(Order order) {
        order.setOrderDate(new Date(System.currentTimeMillis()));
        Optional<Users> user = usersService.getUserByEmail(order.getEmail());
        if(user.isPresent()) {
            order.setUserId(user.get());
        }
        order.setPaymentStatus("Pending");
        order.setOrderStatus("Pending");
        String orderReference = verificationCodeService.generateVerificationCode();
        order.setOrderReference(orderReference);
        orderRepository.save(order);

        // Prepare email content
        OrderDto orderDto = getOrderDetails(order.getOrderId());
        Map<String, Object> model = new HashMap<>();
        model.put("orderId", order.getOrderId()); // Assuming orderId is available from Order entity
        model.put("firstName", orderDto.getFirstName());
        model.put("lastName", orderDto.getLastName());
        model.put("email", orderDto.getEmail());
        model.put("phoneNumber", orderDto.getPhoneNumber());
        model.put("address", orderDto.getAddress());
        model.put("city", orderDto.getCity());
        model.put("state", orderDto.getState());
        model.put("postalCode", orderDto.getPostalCode());
        model.put("productDescription", orderDto.getProductDescription());
        model.put("totalPrice", orderDto.getTotalPrice());
        model.put("orderDate", orderDto.getOrderDate());
        model.put("paymentMethod", orderDto.getPaymentMethod());
        model.put("paymentStatus", orderDto.getPaymentStatus());
        model.put("orderStatus", orderDto.getOrderStatus());
        model.put("orderReference", orderDto.getOrderReference());

        // Send order confirmation email
        emailService.sendOrderConfirmationEmail(
                order.getEmail(),
                "Your Order Confirmation - #" + orderReference,
                model
        );

        System.out.println(order.getOrderId());
        return order.getOrderId();
    }

    public OrderDto getOrderDetails(int orderId) {
        Optional<Order> orderDetails = orderRepository.findById(orderId);

        if (orderDetails.isPresent()) {
            Order order = orderDetails.get();

            return new OrderDto(
                    order.getOrderId(),
                    order.getFirstName(),
                    order.getLastName(),
                    order.getEmail(),
                    order.getPhoneNumber(),
                    order.getAddress(),
                    order.getCity(),
                    order.getState(),
                    order.getPostalCode(),
                    order.getProductDescription(),
                    order.getTotalPrice(),
                    order.getOrderDate(),
                    order.getPaymentMethod(),
                    order.getPaymentStatus(),
                    order.getOrderStatus(),
                    order.getOrderReference()
            );
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    public List<OrderDto> getAll() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setOrderId(order.getOrderId());
        orderDto.setFirstName(order.getFirstName());
        orderDto.setLastName(order.getLastName());
        orderDto.setEmail(order.getEmail());
        orderDto.setPhoneNumber(order.getPhoneNumber());
        orderDto.setAddress(order.getAddress());
        orderDto.setCity(order.getCity());
        orderDto.setState(order.getState());
        orderDto.setPostalCode(order.getPostalCode());
        orderDto.setProductDescription(order.getProductDescription());
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setPaymentMethod(order.getPaymentMethod());
        orderDto.setPaymentStatus(order.getPaymentStatus());
        orderDto.setOrderStatus(order.getOrderStatus());
        orderDto.setOrderReference(order.getOrderReference());
        return orderDto;
    }

    public void updateStatus(OrderDto order) {
        Optional<Order> orderDetails = orderRepository.findById(order.getOrderId());
        if (orderDetails.isPresent()) {
            Order orderToUpdate = orderDetails.get();
            orderToUpdate.setOrderStatus(order.getOrderStatus());
            orderRepository.save(orderToUpdate);
        } else {
            throw new RuntimeException("Order not found with ID: " + order.getOrderId());
        }
    }
}
