// get the client
const mysql = require('mysql2');

// from website
    // create the connection to database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });

    // simple query
    connection.query(
      'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      }
    );

    // with placeholder
    connection.query(
      'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
      ['Page', 45],
      function(err, results) {
        console.log(results);
      }
    );

    import inquirer from 'inquirer';

    inquirer
      .prompt([
        /* Pass your questions in here */
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });



// start of question 
const questions = [
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