DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT auto_increment PRIMARY KEY not null,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT auto_increment PRIMARY KEY not null,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL 
);

CREATE TABLE employee (
  id INT auto_increment PRIMARY KEY not null,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id),
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);
