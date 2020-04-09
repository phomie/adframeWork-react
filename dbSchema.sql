DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS userprofiles ;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(250) NOT NUll,
    lastname VARCHAR(250) NOT NUll,
    email  VARCHAR(100) NOT NUll UNIQUE ,
    password_hash VARCHAR(100) NOT NUll,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create TABLE userprofiles(
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) UNIQUE,
age INTEGER NOT NULL,
city VARCHAR(250) NOT NUll,
homepage VARCHAR(250) NOT NUll

 ) ;