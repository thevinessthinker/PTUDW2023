-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables
CREATE TABLE IF NOT EXISTS accounts (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	name TEXT,
	dob DATE,
	role SMALLINT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(username, email)
);

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	product_name TEXT NOT NULL,
	description TEXT,
	stock_in_quantity INT DEFAULT 0,
	price DECIMAL(10,2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	category_name TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_types (
	id SERIAL PRIMARY KEY,
	type_name TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_details (
	id SERIAL PRIMARY KEY,
	product_id INT REFERENCES products(id),
	category_id INT REFERENCES categories(id),
	type_id INT REFERENCES product_types(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
	id SERIAL PRIMARY KEY,
	customer_id UUID NOT NULL REFERENCES accounts(id),
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	total_amount DECIMAL(10, 2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS order_details (
	id SERIAL PRIMARY KEY,
	order_id INT REFERENCES orders(id),
	product_id INT REFERENCES products,
	quantity INT NOT NULL,
	amount DECIMAL (10, 2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION updated_at_func()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at timestamp before update
CREATE TRIGGER updated_at_on_accounts_trigger
BEFORE UPDATE
ON accounts
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

CREATE TRIGGER updated_at_on_products_trigger
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

CREATE TRIGGER updated_at_on_categories_trigger
BEFORE UPDATE
ON categories
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

CREATE TRIGGER updated_at_on_product_types_trigger
BEFORE UPDATE
ON product_types
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

CREATE TRIGGER updated_at_on_product_details_trigger
BEFORE UPDATE
ON product_details
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

CREATE TRIGGER updated_at_on_orders_trigger
BEFORE UPDATE
ON orders
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();


CREATE TRIGGER updated_at_on_order_details_trigger
BEFORE UPDATE
ON order_details
FOR EACH ROW
EXECUTE FUNCTION updated_at_func();

-- Verson 2 
ALTER TABLE accounts
ADD COLUMN enabled BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS verification_tokens (
	id SERIAL PRIMARY KEY,
	token TEXT NOT NULL,
	account_id UUID NOT NULL REFERENCES accounts(id),
	expiry_date TIMESTAMP,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- END
-- ----------------------------
-- Table structure for Categories
-- ----------------------------
BEGIN;
insert into categories (category_name) values ('Thời trang nữ');
insert into categories (category_name) values ('Thời trang nam');
insert into categories (category_name) values ('Đồng hồ');
insert into categories (category_name) values ('Điện thoại & Phụ kiện');
insert into categories (category_name) values ('Máy tính & Laptop');
insert into categories (category_name) values ('Sách');
COMMIT;
-- ----------------------------
-- Table structure for product_types
-- ----------------------------
BEGIN;
insert into product_types (type_name) values ('Áo thun');
insert into product_types (type_name) values ('Áo khoác');
insert into product_types (type_name) values ('Áo sơ mi');
insert into product_types (type_name) values ('Quần dài');
insert into product_types (type_name) values ('Quần jean');
insert into product_types (type_name) values ('Quần đùi');
insert into product_types (type_name) values ('Vớ/Tất');

insert into product_types (type_name) values ('Chân váy');
insert into product_types (type_name) values ('Đầm/Váy');
insert into product_types (type_name) values ('Áo len & Cardigan');
insert into product_types (type_name) values ('Đồ truyền thống');

insert into product_types (type_name) values ('Khác');
COMMIT;
-- ----------------------------
-- Add product_name and price from products
-- ----------------------------
BEGIN;
INSERT INTO products (product_name,price) values('Áo Cardigan',159000.00);
INSERT into products (product_name,price) values('Áo Khoác Bomber Pilot Oversized Màu Xám',199000.00);
INSERT into products (product_name,price) values('Áo Khoác Bomber Pilot Oversized Màu Chàm',259000.00);
INSERT into products (product_name,price) values('Áo Khoác Bomber Pilot Oversized Màu Kem',170000.00);
INSERT into products (product_name,price) values('Áo Khoác ROWAY',399000.00);

INSERT into products (product_name,price) values('Quần Jean Dài Ống Rộng',165000.00);
INSERT into products (product_name,price) values('Quần Baggy Jean Ống Rộng Có Dây',180000.00);
INSERT into products (product_name,price) values('Quần Jean Light Gray Smoke',257000.00);
INSERT into products (product_name,price) values('Quần Jean Ống Rộng Màu Bạc Có Viền Line',359000.00);
INSERT into products (product_name,price) values('Quần Jean Túi Hộp',499000.00);

INSERT into products (product_name,price) values('Harry Potter Và Hòn Đá Phù Thủy',120000.00);
INSERT into products (product_name,price) values('Price And Prejudice',118000.00);
INSERT into products (product_name,price) values('The Great Gatsby',339000.00);
INSERT into products (product_name,price) values('The Little Prince',216000.00);
INSERT into products (product_name,price) values('The Alchemist',255000.00);
INSERT into products (product_name,price) values('The Book Thief',352000.00);
INSERT into products (product_name,price) values('The Call Of The Wild',434000.00);
INSERT into products (product_name,price) values('The Color Purple',237000.00);
INSERT into products (product_name,price) values('The Kite Runner',130000.00);
INSERT into products (product_name,price) values('The Lovely Bones',193000.00);
INSERT into products (product_name,price) values('Chúa tể của những chiếc nhẫn',310000.00);
COMMIT;
-- ----------------------------
-- Add description and stock_in_quantity from products
-- ----------------------------
UPDATE products
set description='Áo khoác chất vải kim tuyến', stock_in_quantity=11
where id=2;
UPDATE products SET stock_in_quantity=5 where id=3;
UPDATE products SET stock_in_quantity=7 where id=4;
UPDATE products SET stock_in_quantity=6 where id=5;
UPDATE products SET stock_in_quantity=6 where id=6;
UPDATE products SET stock_in_quantity=8 where id=7;
UPDATE products SET stock_in_quantity=0 where id=8;
UPDATE products SET stock_in_quantity=12  where id=9;
UPDATE products SET stock_in_quantity=15  where id=10;
UPDATE products SET stock_in_quantity=9  where id=11;
UPDATE products SET stock_in_quantity=7  where id=12;
UPDATE products SET stock_in_quantity=13  where id=13;
UPDATE products SET stock_in_quantity=20 where id=14;
UPDATE products SET stock_in_quantity=11  where id=15;
UPDATE products SET stock_in_quantity=18  where id=16;
UPDATE products SET stock_in_quantity=21  where id=17;
UPDATE products SET stock_in_quantity=14  where id=18;
UPDATE products SET stock_in_quantity=8  where id=19;
UPDATE products SET stock_in_quantity=7  where id=20;
UPDATE products SET stock_in_quantity=19  where id=21;