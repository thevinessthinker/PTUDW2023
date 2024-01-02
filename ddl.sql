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

-- END