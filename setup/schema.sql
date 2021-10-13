CREATE DATABASE matras;
CREATE EXTENSION pgcrypto;
CREATE TYPE status_num AS ENUM ('0', '1', '2', '3');
-- 0 -> eski;
-- 1 -> yangi;
-- 2 -> aksiya;
-- 3 -> yangi va aksiya
CREATE TYPE active_num AS ENUM ('0', '1');
-- 0 -> active;
-- 1 -> disable;
CREATE TYPE check_num AS ENUM ('0', '2');
-- 0 -> unchecked;
-- 1 -> checked;
CREATE TYPE delete_num AS ENUM ('0', '1');
-- 0 -> not deleted
-- 1 -> deleted

CREATE TABLE banners (
    id serial primary key,
    title varchar(100),
    image varchar(100),
    is_active active_num default '0',
    is_deleted delete_num default '0',
    date timestamptz default current_timestamp
);

CREATE TABLE statistics (
    experience int,
    client int,
    guarantee int,
    delivery int
);

CREATE TABLE models (
    id serial primary key,
    name varchar(20),
    is_active active_num default '0',
    is_deleted delete_num default '0',
    date timestamptz default current_timestamp
);

CREATE TABLE products (
    id serial primary key,
    name varchar(100),
    current_price int,
    images text,
    detail text,
    weight int,
    guarantee int,
    size varchar(20),
    capacity int,
    discount_price int default 0,
    status status_num default '3',
    is_active active_num default '0',
    is_deleted delete_num default '0',
    model_id int references models(id),
    date timestamptz default current_timestamp
);

CREATE TABLE orders (
    id serial primary key,
    name varchar(20),
    tel varchar(7),
    product varchar(100),
    product_id int references products(id),
    amount int,
    is_checked check_num default '0',
    date timestamptz default current_timestamp
);

CREATE TABLE address (
    id serial primary key,
    address varchar(50),
    target text,
    location text,
    images text,
    is_active active_num default '0',
    is_deleted delete_num default '0'
);

CREATE TABLE interest (
    id serial primary key,
    tel varchar(7),
    is_checked check_num default '0',
    date timestamptz default current_timestamp
);

CREATE TABLE technologies (
    id serial primary key,
    name varchar(30),
    video varchar(200),
    thumbnail varchar(200),
    detail text,
    is_active active_num default '0',
    is_deleted delete_num default '0'
);

CREATE TABLE admin (
    id serial primary key,
    username varchar(100),
    password text
);