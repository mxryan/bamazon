CREATE DATABASE bamazon

USE ice_creamDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(90) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES 
("batteries", "home", 4.50, 100),
("chicken", "food", 5.50, 50),
("cutlery", "home", 20.50, 20),
("diamonds", "jewelry", 11999.99, 4),
("chicken eggs", "food", 2.50, 200),
("dinosaur egg", "misc", 4239.95, 2),
("tank", "misc", 2139447.77, 1),
("t-rex", "misc", 116779.82, 2),
("quantum flux capacitor", "electronics", 4017017.17, 3),
("turbo-encabulator", "electronics", 198724.43, 6),
("biscuit mix", "food", 6.99, 250),
("lead ingot", "misc", 447.87, 999),
("bucket of air", "misc", 1.50, 35),
("cow", "misc", 987.50, 12),
("mystery box", "misc", 1395.95, 42),
("cereal", "food", 3.50, 2000),
("frozen vegetables", "food", 1.19, 557),
("jerky - beef", "food", 6.50, 417),
("vodka", "food", 19.95, 389);

















