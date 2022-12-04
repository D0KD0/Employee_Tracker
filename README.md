# Employee_Tracker

GIVEN a command-line application that accepts user input

/ WHEN I start the application
THEN I am presented with the following options: 
0 view all departments, 
1 view all roles, 
2 view all employees, 
3 add a department, 
4 add a role, 
5 add an employee, 
6 and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

/ WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

/ WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

/ WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

/ WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
