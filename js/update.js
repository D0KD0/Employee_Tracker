const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'employee_db'
    });

const updateEmployee = (role, employee) => {
    db.query(`update employee set role_id = ? where first_name = ?`, [role, employee])
} 

module.exports = updateEmployee;