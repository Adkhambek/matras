CREATE DATABASE matras;
CREATE EXTENSION pgcrypto;

CREATE TABLE banners (
    id serial primary key,
    title varchar(100),
    image varchar(100)
);

CREATE TABLE statistics (
    experience int,
    client int,
    guarantee int,
    delivery int
);

CREATE TABLE models (
    id serial primary key,
    name varchar(20)
);

CREATE TABLE products (
    id serial primary key,
    name varchar(100),
    image varchar(100),
    current_prize int,
    discount int default 0,
    detail text,
    weight int,
    guarantee int,
    size varchar(20),
    capacity int,
    status smallint default 0,
    model_id int references models(id)
);

CREATE TABLE technologies (
    id serial primary key,
    name varchar(30),
    video varchar(100),
    detail text
);

CREATE TABLE admin (
    id serial primary key,
    username varchar(100),
    password text
);