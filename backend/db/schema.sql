DROP DATABASE IF EXISTS triphikers_db;
CREATE DATABASE triphikers_db;

\c triphikers_db;

DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;

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
    planner_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
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
    itinerary VARCHAR,
    description VARCHAR,
    is_completed BOOLEAN DEFAULT 'false'
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    image VARCHAR,
    latitude VARCHAR,
    longitude VARCHAR,
    location_name VARCHAR,
    emergency_services VARCHAR,
    poster_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);