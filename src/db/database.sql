CREATE DATABASE laptop_crawler;

CREATE TABLE laptop{
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMBER,
    shop VARCHAR(50),
};