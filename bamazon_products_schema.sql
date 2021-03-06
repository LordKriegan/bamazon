CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    department_name VARCHAR(50) NOT NULL
);

SELECT * FROM products;

--the following is for altering existing tables--

USE bamazon;
ALTER TABLE products
	ADD product_sales DECIMAL(6,2) NOT NULL;
    
SELECT * FROM products;