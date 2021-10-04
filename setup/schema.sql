CREATE DATABASE matras;
CREATE EXTENSION pgcrypto;
CREATE TYPE status_num AS ENUM ('0', '1', '2', '3');
CREATE TYPE active_num AS ENUM ('0', '1');
CREATE TYPE check_num AS ENUM ('0', '2');

CREATE TABLE banners (
    id serial primary key,
    title varchar(100),
    image varchar(100),
    is_active active_num default '0',
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
    date timestamptz default current_timestamp
);

CREATE TABLE products (
    id serial primary key,
    name varchar(100),
    current_prize int,
    images text [],
    detail text,
    weight int,
    guarantee int,
    size varchar(20),
    capacity int,
    discount_prize int default 0,
    status status_num default '0',
    is_active active_num default '0',
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
    address varchar(50),
    target text,
    location text,
    images text [],
    is_active active_num default '0'
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
    is_active active_num default '0',
    detail text
);

CREATE TABLE admin (
    id serial primary key,
    username varchar(100),
    password text
);