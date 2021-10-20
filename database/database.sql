CREATE DATABASE webcrawler;

CREATE TABLE scrapers{
    scraper_id SERIAL PRIMARY KEY
    product_list_uri TEXT
    params JSON
    website TEXT
};

CREATE TABLE workers{
    worker_id SERIAL PRIMARY KEY
    scraper_id INTEGER
    page_url TEXT
    selectors JSON[]
    last_update DATE
};

CREATE TABLE products{
    product_id SERIAL PRIMARY KEY
    worker_id INTEGER
    title TEXT
    price VARCHAR(50)
    shop TEXT
    shop_location TEXT
    website TEXT
    last_update DATE
};