DROP DATABASE IF EXISTS triphikers_db;
CREATE DATABASE triphikers_db;

/c triphikers_db;

DROP TABLE IF EXISTS trips
DROP TABLE IF EXISTS users

CREATE TABLE users (
    id VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    email VARCHAR,
    age INTEGER,
    profile_picture VARCHAR,
    gender VARCHAR,
    bio VARCHAR,
    country_of_origin VARCHAR
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    planner_id VARCHAR,
    destination VARCHAR,
    date_from VARCHAR,
    date_to VARCHAR,
    group_type VARCHAR,
    language VARCHAR,
    before_trip_meetup VARCHAR,
    trip_type VARCHAR,
    trip_title VARCHAR,
    first_time VARCHAR,
    accommodation VARCHAR,
    budget INTEGER,
    split_costs VARCHAR,
    itinierary VARCHAR,
    description VARCHAR
);