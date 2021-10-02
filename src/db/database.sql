CREATE DATABASE laptop_crawler;

CREATE TABLE laptop{
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    shop VARCHAR(50),
    location VARCHAR(20),
    price NUMBER,
    description VARCHAR(200),
};