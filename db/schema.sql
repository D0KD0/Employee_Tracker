drop database if exists employee_db;
create database employee_db;

use employee_db;

create table department (
    id INT PRIMARY KEY not null,
    name varchar(30)
)

create table role (
    id INT PRIMARY KEY not null,
    title varchar(30),
    salary decimal,
    department_id INT not null
)

create table employee (
    id INT PRIMARY KEY not null,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT not null,
    manager_id INT
)