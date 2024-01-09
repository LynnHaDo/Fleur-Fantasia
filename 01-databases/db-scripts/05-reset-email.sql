USE `full-stack-ecommerce`;

SET FOREIGN_KEY_CHECKS = 0;

-- Drop all existing entries 
TRUNCATE `full-stack-ecommerce`.`orders`;
TRUNCATE `full-stack-ecommerce`.`order_item`;
TRUNCATE `full-stack-ecommerce`.`address`;
TRUNCATE `full-stack-ecommerce`.`customer`;

SET FOREIGN_KEY_CHECKS = 1;

-- Make email address unique
ALTER TABLE customer ADD UNIQUE(email);
