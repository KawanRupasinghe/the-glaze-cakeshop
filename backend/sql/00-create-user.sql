-- Drop user first if they exist
DROP USER IF EXISTS 'cakeShop'@'%';

-- Now create user with prop privileges
CREATE USER 'cakeShop'@'localhost' IDENTIFIED BY 'cakeShop';

GRANT ALL PRIVILEGES ON * . * TO 'cakeShop'@'localhost';