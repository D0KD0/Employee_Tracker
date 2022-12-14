const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  });

const addDept = (department) => {
    db.query(`insert into department(name) values(?)`, department)
}

const addRole = (title, salary, department_id) => {
    db.query(`insert into role (title, salary, department_id) values (?, ?, ?)`, [title, salary, department_id])
}

const addEmployees = (first_name, last_name, role_id, manager_id) => {
    db.query(`insert into employee (first_name, last_name, role_id, manager_id) values(?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
}

module.exports = { addDept, addRole, addEmployees };