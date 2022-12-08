const mysql = require('mysql2');
const inquirer = require('inquirer');

const {addDept, addRole, addEmployees} = require('./js/add');
const {viewDepts, viewRoles, viewEmployees} = require('./js/view');
const {updateEmployee} = require('./js/update');

db = require("./db/connection.js");

// start of question 
const firstQuestion = [
  {
    type: 'list',
    message: 'Choose one of the following options:',
    name: 'options',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ]
  }
]

const addDeptQs = [
  {
    type: 'input',
    message: 'Enter a name of the department to add',
    name: 'deptName'
  }
]



const decideRole = () => {
  db.query(`select * from role order by id`, function (err, results) {
    results.forEach(role => {
      addRoleQs[2].choices.push(department.name);
    });
  });
}

const decideMgr = () => {
  db.query(`SELECT id, first_name FROM employee order by id`, function (err, results) {
      results.forEach(employee => {
          addEmpQs[3].choices.push(employee.first_name);
          updateEmpQuestions[0].choices.push(employee.first_name);
      });
    })
    
}

const addRoleQs = [
  {
    type: 'input',
    message: 'Enter a name of the role',
    name: 'roleName'
  },

  {
    type: 'input',
    message: 'Enter a salary of the role',
    name: 'roleSalary'
  },

  {
    type: 'input',
    message: 'Enter a department of the role',
    name: 'roleDept'
  }
]

const addEmpQs = [
  {
    type: 'input',
    message: 'Enter a first name of the employee',
    name: 'firstName'
  },

  {
    type: 'input',
    message: 'Enter a last name of the employee',
    name: 'lastName'
  },

  {
    type: 'input',
    message: 'Enter a role of the employee',
    name: 'newEmpRole'
  },

  {
    type: 'input',
    message: 'What is a name of his/her Manager?',
    name: 'newEmpMgr',
    choices: ['Unknown']
  }
]

const updateEmpQuestions = [
  {
    type: 'list',
    message: 'Which employee you want to update his/her role?',
    name: 'empName',
    choices: []
  },

  {
      type : 'list',
      message : 'Which role do you want to assign to the employee?',
      name : 'addRole',
      choices : []
  }
]

const updateEmpChoices = () => {
  db.query(`SELECT id, first_name FROM employee`, function (err, results) {
      results.forEach(employee => {
          updateEmpQuestions[0].choices.push(employee.first_name);
      });
    })
    
}

const updateRoleChoices = () => {
  db.query(`SELECT id, title FROM role`, function (err, results) {
      results.forEach(role => {
          updateEmpQuestions[1].choices.push(role.title);
      });
    })
    
}

// choices
const {choices} = firstQuestion[0];
const startPrompt = () => {
  inquirer
  .prompt(firstQuestion)
  .then( (choiceObj) => {
    const {options} = choiceObj;
    switch(options) {
      case 'View all departments':
      viewDepts();
      startPrompt();
      break;

      case 'View all roles' :
      viewRoles();
      startPrompt();
      break;

      case  'View all employees' :
      viewEmployees();
      startPrompt();
      break;

      case 'Add a department' :
      addDeptPrompt();
      break;

      case 'Add a role' :
      addRolePrompt();
      break;

      case 'Add an employee' :
      addEmpPrompt();
      break;

      case 'Update an employee role' :
      updateEmpChoices();
      updateRoleChoices();
      updateEmpPrompt();
      break;
    }
    
  })
}

// prompt
const addDeptPrompt = () => {
  inquirer.prompt(addDeptQs)
  .then((deptObj) => {
    addDept(deptObj.deptName);
  })
  .then(() => startPrompt())
}

const addRolePrompt = () => {
inquirer.prompt(addRoleQs)
.then((roleObj) => {
  const { roleName, roleSalary, roleDept } = roleObj;
  db.query(`select id from department where name = ?`, roleDept, function(err, results) {
    const roleIndex = results[0].id;
    addRole(roleName, roleSalary, roleIndex);
  })
})
.then(()=> startPrompt())
}

const addEmpPrompt = () => {
  inquirer.prompt(addEmpQs)
  .then((empObj) => {
      const { firstname, lastname, role, manager } = empObj;
      db.query(`SELECT role.id AS roleId FROM role WHERE title = ?`, role, function(err, results) {
          const roleIndex = results[0].roleId
      db.query(`SELECT employee.id AS managerId FROM employee WHERE first_name = ?`, manager, function(err, results) {
          const managerIndex = results[0].managerId
          addEmployees(firstname, lastname, roleIndex, managerIndex)
          })
      })
  })
  .then(()=> startPrompt())
}


const updateEmpPrompt = () => {
  inquirer.prompt(updateEmpQuestions)
          .then((updateObj) => {
              const { employee, role } = updateObj;
              db.query(`SELECT id FROM role WHERE title = ?`, role, function(err, results) {
                  const roleIndex = results[0].id;
                  update(roleIndex, employee);
              })
          })
          .then(()=> startPrompt())
}

startPrompt();