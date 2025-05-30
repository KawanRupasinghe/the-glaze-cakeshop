DROP DATABASE  IF EXISTS `cakeShop`;
CREATE DATABASE `cakeShop`;
USE `cakeShop`;

CREATE TABLE `users_type` (
  `user_type_id` int NOT NULL AUTO_INCREMENT,
  `user_type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users_type` VALUES (1,'Customer'),(2,'Shop Owner');

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `user_type_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  KEY `FK5snet2ikvi03wd4rabd40ckdl` (`user_type_id`),
  CONSTRAINT `FK5snet2ikvi03wd4rabd40ckdl` FOREIGN KEY (`user_type_id`) REFERENCES `users_type` (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `users`VALUES (1, 'admin@gmail.com', 1, '$2a$10$hvI2wjFnVkdLARBOmmrJwOIhigqYeHmTspI1noPPFmN.l3uxmBs3i', '2025-04-23', 2);
CREATE TABLE `customer_profile` (
  `user_account_id` int NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_account_id`),
  CONSTRAINT `FKohp1poe14xlw56yxbwu2tpdm7` FOREIGN KEY (`user_account_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_type` (
  `product_type_id` int NOT NULL AUTO_INCREMENT,
  `product_type_name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
   `price_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `product_type` VALUES (1,'Cakes', 'cake.jpg', '500g - Rs 2100 /=, 1Kg - Rs 3900 /='),(2,'Cupcakes', 'cupcake.jpg', '6PCS - Rs 1200 /='),(3,'Brownies', 'brownies.jpg', '10PCS - Rs 2000 /='),(4,'Cookies', 'cookies.jpg', '6PCS - Rs 1200 /='),(5,'Muffins', 'muffins.jpg', '10PCS - Rs 2000 /=');

CREATE TABLE `cake_quantity_type` (
  `quantity_id` int NOT NULL AUTO_INCREMENT,
  `quantity` varchar(255) DEFAULT NULL,
  `quantity_price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`quantity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `cake_quantity_type` VALUES (1,'500g','RS.2500.00'),(2,'1kg', 'RS.3900.00'),(3,'2Kg', 'RS.5200.00');


CREATE TABLE `product_cake` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `product_type_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK5snet2ikvi03wd4rabd40ckdl` (`product_type_id`),
  CONSTRAINT `FK5snet2ikvi03wd4rabd40ckd3` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `product_cake` (`product_name`, `product_description`, `product_price`, `product_image`,`product_type`, `product_type_id`) VALUES
('Cherry Choco', 'Rich chocolate cake with smooth ganache frosting', 'Rs.2500.00', '/cake1.jpg', 'chocolate',1),
('Blossom Pink', 'Light vanilla cake with buttercream frosting', 'Rs.2100.00', '/cake2.jpg','vanilla', 1),
('Choco Drizzle', 'Classic red velvet with cream cheese frosting', 'Rs.2300.00', '/cake3.jpg', 'specialty',1),
('Choco Chip', 'Fresh strawberry cake with whipped cream', 'Rs.2200.00', '/cake4.jpg','fruit', 1),
('Mocha Bloom', 'Tangy lemon cake with blueberry filling', 'Rs.2500.00', '/cake5.jpg', 'fruit',1),
('Tiramisu Cake', 'Coffee-soaked layers with mascarpone cream', 'Rs.2200.00', '/cake6.jpg', 'specialty',1),
('Rose Delight', 'Spiced carrot cake with cream cheese frosting', 'Rs.2500.00', '/cake7.jpg', 'specialty', 1),
('Dark Chocolate Raspberry', 'Dark chocolate cake with raspberry filling', 'Rs.3100.00', '/cake8.jpg', 'chocolate',1),
('Blue Frost', 'Blueberry cheesecake with graham cracker crust', 'Rs.2800.00', '/cake9.jpg', 'specialty',1),
('Floral Grace', 'Rose-infused cake with pistachio frosting', 'Rs.2100.00', '/cake10.jpg', 'specialty',1),
('Spiced Pumpkin Glow', 'Pumpkin spice cake with maple frosting', 'Rs.2500.00', '/cake11.jpg', 'specialty',1),
('Choco Cascade', 'Triple chocolate cake with ganache drip', 'Rs.2600.00', '/cake12.jpg', 'specialty',1),
('Mango Tango', 'Mango mousse cake with tropical fruit layers', 'Rs.2200.00', '/cake13.jpg', 'specialty',1),
('Hazelnut Dream', 'Hazelnut praline cake with chocolate frosting', 'Rs.2800.00', '/cake14.jpg','specialty', 1),
('Lemon Zest Bliss', 'Lemon curd cake with meringue topping', 'Rs.2500.00', '/cake15.jpg','specialty', 1);

CREATE TABLE `product_cupcake` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_flavour` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_type_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK5snet2ikvi03wd4rabd40ckdl` (`product_type_id`),
  CONSTRAINT `FK5snet2ikvi03wd4rabd40ckd43` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Classic Cupcake with all flavors
INSERT INTO product_cupcake (product_name, product_flavour, product_price, product_image, product_type_id)
VALUES 
    ('Classic Cupcake', 'Vanilla', '150', '/cupcakes1.avif', 2),
    ('Classic Cupcake', 'Chocolate', '170', '/cupcakes1.avif', 2),
    ('Classic Cupcake', 'Strawberry', '180', '/cupcakes1.avif', 2);

-- Deluxe Cupcake with all flavors
INSERT INTO product_cupcake (product_name, product_flavour, product_price, product_image, product_type_id)
VALUES 
    ('Deluxe Cupcake', 'Vanilla', '200', '/cupcake.jpg', 2),
    ('Deluxe Cupcake', 'Chocolate', '220', '/cupcake.jpg', 2),
    ('Deluxe Cupcake', 'Strawberry', '230', '/cupcake.jpg', 2);

-- Mini Cupcake with all flavors
INSERT INTO product_cupcake (product_name, product_flavour, product_price, product_image, product_type_id)
VALUES 
    ('Signature Cupcake', 'Vanilla', '100', '/cupcakes2.avif', 2),
    ('Signature Cupcake', 'Chocolate', '120', '/cupcakes2.avif', 2),
    ('Signature Cupcake', 'Strawberry', '130', '/cupcakes2.avif', 2);
    
    CREATE TABLE `product_other` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_unit_price` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_type_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK5snet2ikvi03wd4rabd40ckdl` (`product_type_id`),
  CONSTRAINT `FK5snet2ikvi03wd4rabd40ckd9` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 -- Insert Brownie into product_other
INSERT INTO product_other (product_name, product_unit_price, product_image, product_type_id)
VALUES ('Fudgy Chocolate Brownie', '250', '/brownies.jpg', 3);

-- Insert Cookies into product_other
INSERT INTO product_other (product_name, product_unit_price, product_image, product_type_id)
VALUES 
    ('Classic Cookie', '120', '/classiccookie.avif', 4),
    ('Chocolate Chip Cookie', '150', '/chocolatechipcookie.avif', 4),
    ('Oatmeal Raisin Cookie', '130', '/oatmealcookie.avif', 4);

-- Insert Muffin into product_other
INSERT INTO product_other (product_name, product_unit_price, product_image, product_type_id)
VALUES ('Classic Blueberry Muffin', '200', '/muffins.jpg', 5);
 
CREATE TABLE `password_reset_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `verification_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
   `product_description` TEXT,
  `payment_receipt` varchar(255) DEFAULT NULL,
  `total_price` varchar(255) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `order_reference` varchar(255) DEFAULT NULL,
   `user_id` int DEFAULT NULL, 
  PRIMARY KEY (`order_id`),
  CONSTRAINT `FKohp1poe14xlw56yxbwu2tpdm67` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `delivery` (
  `delivery_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_address` varchar(255) DEFAULT NULL,
   `product_description` TEXT,
  `total_price` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
   `delivery_reference` varchar(255) DEFAULT NULL,
    `delivery_status` varchar(255) DEFAULT NULL,
   `order_id` int DEFAULT NULL, 
  PRIMARY KEY (`delivery_id`),
  CONSTRAINT `FKohp1poe14xlw56yxbwu2tpdm21` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

