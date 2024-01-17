USE `fleurdb`;

SET FOREIGN_KEY_CHECKS = 0;

-- Drop all existing entries 
TRUNCATE `fleurdb`.`orders`;
TRUNCATE `fleurdb`.`order_item`;
TRUNCATE `fleurdb`.`address`;
TRUNCATE `fleurdb`.`customer`;

SET FOREIGN_KEY_CHECKS = 1;

-- Make email address unique
ALTER TABLE customer ADD UNIQUE(email);
