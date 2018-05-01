DROP DATABASE IF EXISTS bamazon;

create database bamazon;

use bamazon;

create table products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity);
VALUES ('Fortnite','Video Games', 59.99, 360), 
('HALO', 'Video Games', 29.98, 34)
('Sour Patch Kids', 'Food and Drink', 4.29, 100)
('Jorts', 'Apparel', 3.56, 45),
('Mesh Shirt', 'Apparel', 45.67, 8),
('Lion King', 'Films', 19.99, 298),
('Monopoly', 'Board Games', 20.50, 3459),
('Guess Who', 'Board Games', 19.95 ,1)