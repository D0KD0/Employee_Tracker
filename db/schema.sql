drop database if exists employee_db;
create database employee_db;

use employee_db;

create table department (
    id INT auto_increment PRIMARY KEY not null,
    name varchar(30) not null
)

create table role (
    id INT auto_increment PRIMARY KEY not null,
    title varchar(30),
    salary decimal,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE set null
)

create table employee (
    id INT auto_increment PRIMARY KEY not null,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);