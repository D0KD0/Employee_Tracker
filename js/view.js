const mysql = require('mysql2');
const table = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'employee_db'
    });

const viewDept = () => {
  db.query(`select * from department order by id`, function (err, results) {
    console.log("");
    console.table(results);
  })
}

const viewRole = () => {
  db.query(`select role.id, title, name as department, salary 
            from role
            join department
            on role.department_id = department.id
            order by role.id`, function (err, results) {
    console.log("");
    console.table(results);
  })
}

const viewEmployees = () => {
  db.query(`select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, salary, concat(managers.first_name, ' ', managers.last_name) as manager
            from employee
            join role
            on employee.role_id = role.id
            join department
            on role.department_id = department.id
            left join employee AS managers
            on employee.manager_id = managers.id
            order by employee.id`, function (err, results) {
    console.log('');
    console.table(results);
  })
}

module.exports = {viewDept, viewRole, viewEmployees};
