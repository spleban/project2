DROP DATABASE IF EXISTS schedule_db;

CREATE DATABASE schedule_db;

USE schedule_db;

CREATE TABLE provider (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(20) NOT NULL,
  product_id INT,
  daily_slots INT,
  PRIMARY KEY (id)
);

CREATE TABLE customer (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE session (
  id INT AUTO_INCREMENT NOT NULL,
  customer_id INT NOT NULL,
  provider_id INT NOT NULL,
  product_id INT NOT NULL,
  date DATE NOT NULL,
  slot INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);