-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `full-stack-ecommerce`;

CREATE SCHEMA `full-stack-ecommerce`;
USE `full-stack-ecommerce` ;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
   `date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Categories
-- -----------------------------------------------------
INSERT INTO product_category(category_name) VALUES ('Bouquets');
INSERT INTO product_category(category_name) VALUES ('Plants');

-- -----------------------------------------------------
-- Bouquets
-- -----------------------------------------------------
INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-001', 'Bouquet coloré', 
'Color and joy, here are the key words of this solar bouquet designed and composed by our artisan florists.\nComposition: roses, bony, alstroemerias, germinis, eucalyptus.',
'assets/images/products/bouquets/bouquet-colore-1.jpg'
,1,100,38.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-002', 'Bouquet couleur rose', 
'Composed by our artisan florists, this floral creation combines elegance and singularity of our pink bouquet.\nComposition: roses, santinis, alstroemerias, germinis, wax.',
'assets/images/products/bouquets/bouquet-couleur-rose-1.jpg'
,1,100,35.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-003', 'Bouquet de Lys', 
'Bring a fragrant note to your bouquet with these lilies with pink nuances!\nCombined with the tropicality of ruscus and the freshness of eucalyptus, this bouquet will let out all the authenticity of the pink lily.',
'assets/images/products/bouquets/bouquet-lys-1.jpg'
,1,100,24.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-004', 'Bouquet de roses colorées', 
'Composed by our artisan florists, this bouquet of roses, associated with the lightness of gypsophila and the freshness of eucalyptus, embodies a unique personality and brings its own palette of colors and emotions.',
'assets/images/products/bouquets/bouquet-roses-blanches-1.jpg'
,1,100,29.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-005', 'Bouquet de roses roses', 
'Discover the elegance and softness of the bouquet of powdered roses, combined with the liveliness of gypsophila and the freshness of eucalyptus.',
'assets/images/products/bouquets/bouquet-roses-roses-1.jpg'
,1,100,24.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-006', 'Vases', 
'Pretty glass vases, discreet and cylindrical to enhance your flowers.\nAvailable in two sizes:\nMedium: Diam. 12cm; High. 20cm\nLarge: Diam. 12cm; High. 25cm',
'assets/images/products/bouquets/vase-duo.jpg'
,1,100,14.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-007', 'Bouquet champêtre', 
'An invitation to disconnect from the frenzy of everyday life! The natural charm of the country bouquet is a sure value.',
'assets/images/products/bouquets/bouquet-champetre-1.jpg'
,1,100,24.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-008', 'Bouquet vert et blanc', 
'Choose the combination of soft and refreshing colors with this harmonious and elegant green and white bouquet.',
'assets/images/products/bouquets/bouquet-vert-blanc-1.jpg'
,1,100,35.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-009', 'Bouquet de roses blanches', 
'Purity and simplicity personified! The bouquet of white roses created by our artisan florists will brighten up your daily life.',
'assets/images/products/bouquets/bouquet-roses-blanches-1.jpg'
,1,100,29.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOUQUET-010', 'Bouquet de roses rouges', 
'Express your gratitude or passion through the intensity of our red roses, the light of gypsophila and the freshness of eucalyptus.',
'assets/images/products/bouquets/bouquet-roses-rouges-1.jpg'
,1,100,29.99,1, NOW());

-- -----------------------------------------------------
-- Plants
-- -----------------------------------------------------
INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-001', 'Spathiphyllum', 
'This depolluting plant, nicknamed “moon flower” or “peace lily”, presents beautiful, full foliage bordered by surprising white flowers.\nPlus, it can thrive in areas with low light, making it an ideal houseplant!',
'assets/images/products/plants/plante-spathiphyllum-1.jpg'
,1,100,34.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-002', 'Monstera', 
'The Monstera is one of the most trendy and resistant plants.\nWith its large openwork and luxuriant green leaves, this plant greens an interior with style and exoticism.',
'assets/images/products/plants/plante-monstera-1.jpg'
,1,100,39.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-003', 'Dracaena', 
'Thanks to its palmate foliage and robust trunk, the Dracaena or Dragon Tree brings a touch of exoticism to an interior! Both aesthetic and vigorous, it is one of the most popular indoor plants.',
'assets/images/products/plants/plante-dracaena-1.jpg'
,1,100,49.00,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-004', 'Yucca', 
'Discover the splendor and resilience of the Yucca plant! With its slender green leaves and architectural shapes, Yucca brings an elegant touch of greenery to your interior.',
'assets/images/products/plants/plante-yucca-1.jpg'
,1,100,35.00,1, NOW());