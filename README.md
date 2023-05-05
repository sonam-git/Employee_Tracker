# NOTE TAKER

 [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  
## Description:
The application enables users with no coding knowledge to easily view and interact with information stored in databases.  .

## Table of Contents:
- [Overview](#overview)
- [The Challenge](#the-challenge)
- [Usage Information](#usage-instructions)
- [Installation Process](#installation-process)
- [Built With](#built-with)
- [What I Learned](#what-i-learned)
- [Continued Development](#continued-development)
- [Solution URL](#solution-url)
- [Demo Walkthrough Video](#demo-walkthrough-video)
- [Screenshots](#screenshots)
- [License](#license)
- [Author](#author)

# Overview

## The Challenge:
Create an interfaces that allows non-developers to easily view and interact with information stored in an SQL Employee Tracker database. These interfaces are called content management systems (CMS). Objective is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL. 


## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Usage Instructions
1. Open terminal and navigate to employee_tracker folder
2. Type npm init -y into terminal to create a new .json file
3. Type npm i inquirer mysql2 console.table into terminal in order to install necessary packages.
4. Navigate to the db folder
5. Type mysql -u root -p into terminal
6. Enter your password into terminal
7. Type source schema.sql and source seeds.sql      respectively into terminal( make sure to follow the correct path to the sql file after source)
8. Type exit into terminal and navigate back to root folder
9. Type npm start (node server) into the terminal
10. Answer the prompts in the terminal to view, add, and update the database. (Watch the Demo walkthrough video for more detail)

## Installation Process
1. Clone the repository: [EMPLOYEE TRACKER](https://github.com/sonam-git/Employee_Tracker)
( or) Download Zip Folder from Repository from GitHub
2. Install the following: 
 - Node.js [Version 16.18.1](https://nodejs.org/en/blog/release/v18.15.0/)
 - Inquirer.js: [Version 8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4)
 - MYSQL2: [Version 3.2.4](https://www.npmjs.com/package/mysql2)
 - Console.table: [Version 0.10.0](https://www.npmjs.com/package/console.table)
 - Cfonts: [Version 3.1.1](https://www.npmjs.com/package/cfonts)
 
3. Open the cloned repository in any source code editor.
4. Open the integrated terminal and complete the respective installation guides provided above in section (2) to ensure the cloned documentation will operate
5. npm start to run the server

## Built With
- Dynamic JavaScript
- Node.js [Version 16.18.1](https://nodejs.org/en/blog/release/v16.18.1/)
- Inquirer.js: [Version 8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4)
- MYSQL2: [Version 3.2.4](https://www.npmjs.com/package/mysql2)
- Console.table: [Version 0.10.0](https://www.npmjs.com/package/console.table)
- Cfonts: [Version 3.1.1](https://www.npmjs.com/package/cfonts)
- License Badge: [Shields.io](https://shields.io/)
- Visual Studio Code: [Website](https://code.visualstudio.com/)

## What I Learned
- How to build a command line application from scratch to manage an database using Node.js,Inquirer, and MYSQL.
- Basic Content Management System(CMS).

## Continued Development:
1. Create History feature to record the update happened within some period of time.
2. Better organization of folder in order to make it  precise for the user and easier debugging in  case of error handling.

## Solution URL:
[Solution URL Link:](https://github.com/sonam-git/Employee_Tracker)

## Demo Walkthrough Video:
[Click here to watch the Demo](https://drive.google.com/file/d/1ow36sZ3Lm_6Hc-FbJjcBBt93Ygm6Rw6M/view)

## Screenshots:



## License
This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

## Author

Follow me on Github at [Sonam J Sherpa](https://github.com/sonam-git).
Additional questions or concerns? feel free to contact me at sherpa.sjs@gmail.com
