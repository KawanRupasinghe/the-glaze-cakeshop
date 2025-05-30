package com.THEGLAZE.cakeShop.controller;

import com.THEGLAZE.cakeShop.dto.OrderDto;
import com.THEGLAZE.cakeShop.entity.Order;
import com.THEGLAZE.cakeShop.entity.Users;
import com.THEGLAZE.cakeShop.service.OrderService;
import com.THEGLAZE.cakeShop.service.PdfGenerationService;
import com.THEGLAZE.cakeShop.service.UsersService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final UsersService usersService;
    private final OrderService orderService;
    private final ObjectMapper objectMapper;
    private final PdfGenerationService pdfService;

    @Autowired
    public OrderController(UsersService usersService, OrderService orderService, ObjectMapper objectMapper, PdfGenerationService pdfService) {
        this.usersService = usersService;
        this.orderService = orderService;
        this.objectMapper = objectMapper;
        this.pdfService = pdfService;
    }

    @PostMapping(value = "/save", consumes = {"multipart/form-data"})
    public ResponseEntity<?> saveOrder(
            @RequestPart("order") String orderJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<Users> user = usersService.getUserByEmail(username);

        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized user");
        }

        try {
            // Deserialize JSON string to Order object
            ObjectMapper objectMapper = new ObjectMapper();
            Order order = objectMapper.readValue(orderJson, Order.class);
            System.out.println("Deserialized Order: " + order);

            // Check if user exists
            Optional<Users> existUser = usersService.getUserByEmail(order.getEmail());
            if (!existUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User not found for email: " + order.getEmail());
            }

            // Handle file upload (if provided)
            if (file != null && !file.isEmpty()) {
                System.out.println("File received: " + file.getOriginalFilename());

                String contentType = file.getContentType();
                if (contentType == null || !(contentType.equals("application/pdf") || contentType.startsWith("image/"))) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Invalid file type. Only PDF or image files are allowed.");
                }

                String uploadDir = "Uploads/";
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                    System.out.println("Created upload directory: " + uploadPath);
                }

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                System.out.println("Saving file to: " + filePath);

                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                order.setPaymentReceipt(filePath.toString());
                System.out.println("Payment Receipt Path: " + order.getPaymentReceipt());
            } else {
                System.out.println("No file uploaded");
            }

            System.out.println("Order before saving: " + order);
            int orderId = orderService.addNewOrder(order);

            // Return JSON object with orderId
            Map<String, Integer> response = new HashMap<>();
            response.put("orderId", orderId);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }


    @GetMapping("/get")
    public ResponseEntity<?> getOrderDetails(@RequestParam("orderId") int orderId) {
        try {
            OrderDto orderDetails = orderService.getOrderDetails(orderId);
            return ResponseEntity.ok(orderDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<OrderDto> getAllOrders() {
        return orderService.getAll();
    }


    @PutMapping("/update")
    public void updateOrder(@RequestBody OrderDto order) {
        orderService.updateStatus(order);
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generateOrderPdf(@RequestBody OrderDto orderDto) {
        byte[] pdfBytes = pdfService.generateOrderPdf(orderDto);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order-" + orderDto.getOrderReference() + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
