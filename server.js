// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');

const add = require('./js/add');
const view = require('./js/view');
const update = require('./js/update');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: ''
});

// start of question 
const firstQuestion = [
  {
    type: 'input',
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

const addDeptQuestions = [
  {
    type: 'input',
    message: 'Enter a name of the department to add',
    name: 'deptName'
  }
]

const decideDept = () => {
  db.query(`select * from department order by id`, function (err, results) {
    results.forEach(dep => {
      addDeptQuestions[2].choices.push(dep.name);
    });
  })
}

const addRoleQuestions = [
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

const decideRole = () => {
  db.query(`select * from role order by id`, function (err, results) {
    results.forEach(role => {
      addRoleQuestions[2].choices.push(dep.name);
    });
  })
}

const addEmployeeQuestions = [
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

const decideMgr = () => {
  db.query(`SELECT id, first_name FROM employee order by id`, function (err, results) {
      results.forEach(employee => {
          addEmployeeQuestions[3].choices.push(employee.first_name);
          updateEmpQuestions[0].choices.push(employee.first_name);
      });
    })
    
}

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
          // console.log(updateEmpQuestions[0].choices)
      });
    })
    
}

const updateRoleChoices = () => {
  db.query(`SELECT id, title FROM role`, function (err, results) {
      results.forEach(role => {
          updateEmpQuestions[1].choices.push(role.title);
          // console.log(updateEmployeeQuestions[1].choices)
      });
    })
    
}

// choices

const {choices} = firstQuestion[0];
const startPrompt = () => {
  inquirer
  .prompt(firstQuestion)
  .then( (choiceObj) => {
    const {choice} = choiceObj;
    switch(choice) {
      case choices[0] :
      view.viewDepts();
      startPrompt();
      break;

      case choices[1] :
      view.viewRoles();
      startPrompt();
      break;

      case choices[2] :
      view.viewEmployees();
      startPrompt();
      break;

      case choices[3] :
      addDeptPrompt();
      break;

      case choices[4] :
      decideDept();
      addRolePrompt();
      break;

      case choices[5] :
      decideDept();
      decideRole();
      decideMgr();
      addEmpPrompt();
      break;

      case choices[6] :
      updateEmpChoices();
      updateRoleChoices();
      updateEmpPrompt();
      break;

      case choice[7] :
      break;
    }
  })
}

// prompt
const addDeptPrompt = () => {
  inquirer.prompt(addDeptQuestions)
  .then((deptObj) => {
    add.addDept(deptObj.depName);
  })
  .then(() => startPrompt())
}

const addRolePrompt = () => {
  inquirer.prompt(addRoleQuestions)
  .then((roleObj) => {
    const { roleName, roleSalary, roleDep } = roleObj;
    db.query(`select id from department where name = ?`, roleDep, function(err, results) {
      const roleIndex = results[0].id;
      add.addRole(roleName, roleSalary, roleIndex);
  })
})
  .then(()=> startPrompt())
}

const addEmpPrompt = () => {
  inquirer.prompt(addEmployeeQuestions)
          .then((empObj) => {
              const { firstname, lastname, role, manager } = empObj;
              db.query(`select role.id as roleId from role where title = ?`, role, function(err, results) {
                  const roleIndex = results[0].roleId
              db.query(`select employee.id as managerId from employee where first_name = ?`, manager, function(err, results) {
                  const managerIndex = results[0].managerId
                  add.addEmployees(firstname, lastname, roleIndex, managerIndex)
              })
          })

          })
          .then(()=> startPrompt())
}


const updateEmpPrompt = () => {
  inquirer.prompt(updateEmpQuestions)
          .then((updateObj) => {
              const { employee, role } = updateObj;
              db.query(`select id from role where title = ?`, role, function(err, results) {
                  const roleIndex = results[0].id;
                  update(roleIndex, employee);
              })
          })
          .then(()=> startPrompt())
}

startPrompt();