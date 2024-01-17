-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fleurdb`;

CREATE SCHEMA `fleurdb`;
USE `fleurdb` ;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fleurdb`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fleurdb`.`product` (
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
INSERT INTO product_category(category_name) VALUES ('Vases');

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
,1,100,34.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-002', 'Monstera', 
'The Monstera is one of the most trendy and resistant plants.\nWith its large openwork and luxuriant green leaves, this plant greens an interior with style and exoticism.',
'assets/images/products/plants/plante-monstera-1.jpg'
,1,100,39.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-003', 'Dracaena', 
'Thanks to its palmate foliage and robust trunk, the Dracaena or Dragon Tree brings a touch of exoticism to an interior! Both aesthetic and vigorous, it is one of the most popular indoor plants.',
'assets/images/products/plants/plante-dracaena-1.jpg'
,1,100,49.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-004', 'Yucca', 
'Discover the splendor and resilience of the Yucca plant! With its slender green leaves and architectural shapes, Yucca brings an elegant touch of greenery to your interior.',
'assets/images/products/plants/plante-yucca-1.jpg'
,1,100,35.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-005', 'Curry', 
'The curry tree or Bergera koenigii (syn.Murraya koenigii), is a tropical and sub-tropical tree in the family Rutaceae (the rue family, which includes rue, citrus, and satinwood), native to Asia.',
'assets/images/products/plants/plante-cari.jpeg'
,1,100,15.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-006', 'Feroniella Lucida', 
'Feroniella lucida is a small to medium-sized tree armed with numerous long, slender, sharp thorns. The fruit has a tough green rind with a white and pink pulp containing many yellow crunchy seeds.',
'assets/images/products/plants/plante-canthang.jpeg'
,1,100,15.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-007', 'Golden Ambrosia', 
'A tropical delight, the Spondias dulcis boasts glossy leaves and golden fruit. Perfect for bright interiors, it adds a touch of exotic elegance to your home oasis.',
'assets/images/products/plants/plante-coc.jpeg'
,1,100,25.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-008', 'Kokedama Orb', 
'Meet the ethereal Feoniella lucida Kokedama. Its trailing vines adorned with glossy leaves bring enchanting elegance to any space, radiating a lush, verdant glow.',
'assets/images/products/plants/plante-canthang-2.jpeg'
,1,100,37.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-009', 'Kokedama Orchid', 
'Experience the epitome of sophistication with our Orchid Kokedama. Delicate blooms suspended in a moss ball, it exudes grace and charm, making it a captivating indoor centerpiece.',
'assets/images/products/plants/plante-lan.jpeg'
,1,100,18.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-010', 'Sansevieria Kokedama', 
'A harmonious blend of elegance and minimalism, the Kokedama Sansevieria trifasciata exudes tranquility with its vibrant leaves cascading gracefully from a moss-covered orb.',
'assets/images/products/plants/plante-luoiho.jpeg'
,1,100,19.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-011', 'Tamarind Kokedama', 
'Experience the exotic charm of the Kokedama Tamarind. A botanical marvel, its lush greenery suspended in a moss sphere adds a touch of tropical allure to your space.',
'assets/images/products/plants/plante-mebonsai.jpeg'
,1,100,15.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-012', 'Orostachys Japonica Kokedama', 
'Marvel at the captivating simplicity of the Kokedama Orostachys japonica. Its spherical form, adorned with succulent foliage, brings a unique and calming aesthetic to your interior landscape.',
'assets/images/products/plants/plante-ngoatung.jpeg'
,1,100,15.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-013', 'Peperomia Kokedama', 
'The Kokedama Peperomia obtusifolia, a botanical gem suspended in moss, radiates vibrant green energy. Its compact form and glossy leaves make it an enchanting addition to your plant collection.',
'assets/images/products/plants/plante-truongsinh.jpeg'
,1,100,17.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-014', 'Sansevieria Trifasciata Classic', 
'The timeless elegance of the Sansevieria trifasciata shines in its simplicity. Its robust vertical leaves make it a resilient and stylish choice for any indoor environment.',
'assets/images/products/plants/plante-luoiho-2.jpeg'
,1,100,19.00,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-015', 'Pomegranate', 
'Embrace nature\'s bounty with our pomegranate tree. A symbol of abundance and vitality, it graces your space with lush foliage and the promise of delectable fruits.',
'assets/images/products/plants/plante-luu.jpeg'
,1,100,21.50,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-016', 'Bonsai Tamarind', 
'The Bonsai Tamarind embodies tranquility in miniature. Its meticulously pruned form and vibrant foliage make it a captivating addition to your bonsai collection.',
'assets/images/products/plants/plante-mebonsai-2.jpeg'
,1,100,19.50,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('PLANT-017', 'Orostachys Japonica Bonsai', 
'Discover the miniature wonder of the Orostachys japonica Bonsai. A true marvel of nature, it brings a sense of Zen and elegance to your curated bonsai collection.',
'assets/images/products/plants/plante-ngoatung-2.jpeg'
,1,100,19.50,2, NOW());

-- -----------------------------------------------------
-- Vases
-- -----------------------------------------------------

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-001', 'Duo Vases', 
'Pretty glass vases, discreet and cylindrical to enhance your flowers.\nAvailable in two sizes:\nMedium: Diam. 12cm; High. 20cm\nLarge: Diam. 12cm; High. 25cm',
'assets/images/products/vases/vase-duo.jpg'
,1,100,14.00,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-002', 'Rotund Cement Pot Planter', 
'Perfectly proportioned to fit every aesthetic need and is designed to be sufficiently subtle depending on the position and according to the need.\nDiam: 10cm',
'assets/images/products/vases/vase-d10.jpeg'
,1,100,29.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-003', 'Cylindrical Cement Pot Planter', 
'A modern ceramic cylinder, designed for simplicity. Ideal for showcasing tall stems and creating an effortlessly chic atmosphere.\nDiam: 12cm',
'assets/images/products/vases/vase-d12.jpeg'
,1,100,32.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-004', 'Pail Cement Pot Planter', 
'Unleash an urban aesthetic with this geometric concrete pot. Ideal for succulents, its sturdy build brings an industrial edge to your decor.\nDiam: 10cm',
'assets/images/products/vases/pot-d10-1.jpeg'
,1,100,28.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-005', 'Medium Pail Cement Pot Planter', 
'Introduce an industrial touch with this chic cylindrical planter. Its concrete construction adds character to both indoor and outdoor spaces.\nDiam: 12cm',
'assets/images/products/vases/pot-d12-1.jpeg'
,1,100,30.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-006', 'Large Cylindrical Cement Pot Planter', 
'Craft an urban oasis with this cylindrical cement planter. Its sturdy build and contemporary style make it a standout choice.\nDiam: 15cm',
'assets/images/products/vases/pot-d15-1.jpeg'
,1,100,34.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-007', 'Kokedama Cement Plate', 
'Elevate your green companions with our cement botanical plate. Its sturdy circular design provides a stylish base for your favorite plants.\nDiam: 12cm',
'assets/images/products/vases/plate-1.jpeg'
,1,100,7.99,3, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('VASES-008', 'Coconut Shell Bowl', 
'Crafted from sustainable coconut shells, this bowl combines eco-friendliness with style. Perfect for housing your green companions, it adds a natural touch to your botanical display.',
'assets/images/products/vases/plate-2.jpeg'
,1,100,5.99,3, NOW());

