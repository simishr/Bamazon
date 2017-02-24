CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT NOT NULL PRIMARY KEY, 
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price DECIMAL(10, 2),
	stock_quantity INT
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("1", "Echodot", "Kindle Store", 49.99, 500);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("2", "Fitbit Alta", "Electronics", 148.99, 400);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("3", "Cambridge Soundwork", "Electronics", 27.99, 300);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("4", "Amazon Tap", "Electronics", 129.99, 200);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("5", "Samsonite Omni", "Luggage", 79.99, 350);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("6", "Fossil Watch", "Watches", 185, 48);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("7", "Roco Wallet", "Accessories", 14.95, 77);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("8", "Arbour Longboard Deck", "Sports & Outdoors", 99.95, 35);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("9", "Optimum Nutrition Gold", "Sports Nutrition", 57.42, 198);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("10", "Starwars Rogue ONe", "Kids &Toys", 16.45, 210);
