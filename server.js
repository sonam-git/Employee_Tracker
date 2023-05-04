// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const cfonts = require("cfonts");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log(`Successfully connected to the employees_db database.`)
);

// Function to start the application of CFONT
cfonts.say("Employee\n Tracker", {
  font: "block", // define the font face
  align: "left", // define text alignment
  colors: ["yellow"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: "node", // define the environment cfonts is being executed in
});

db.connect(function (err) {
  if (err) throw err;
  console.log(
    "*****************************************************************************\n"
  );
  console.log(
    "                      DEVELOPED BY : SONAM J SHERPA           \n"
  );
  console.log(
    "*****************************************************************************\n"
  );
  startingQuestion();
});

// Starting Question
function startingQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Emplyoee By Department",
          "View Emplyoee By Manager",
          "Add Employee",
          "Delete Employee",
          "Update Employee",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Delete Role",
          "Update Employee Role",
          "View All Departments",
          "Add Department",
          "Delete Department",
          "View the total utilized budget of a department",
          "Delete Departments | Roles | Employees",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.intro) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View Emplyoee By Department":
          viewEmployeeByDepartment();
          break;
        case "View Emplyoee By Manager":
          viewEmployeeByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "View the total utilized budget of a department":
          viewTotalUtilizedBudgetOfDepartment();
          break;
        case "Delete Departments | Roles | Employees":
          deleteDepartmentsRolesEmployees();
          break;
        case "Exit":
          console.log("Good-Bye!");
          db.end();
          break;
      }
    });
}
// ********* Start Employee Function ******** //

// function to view all employees
function viewEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`;
  db.query(sql, (err, response) => {
    if (err) throw err;
    console.table(response);
    // restart the application
    startingQuestion();
  });
}

// function to view employee by department
const viewEmployeeByDepartment = () => {
  console.log("Showing employee by departments...\n");
  const sql = `SELECT employee.first_name, 
                        employee.last_name, 
                        department.name AS department
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id 
              LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // restart the application
    startingQuestion();
  });
};

// function to view employee by department
const viewEmployeeByManager = () => {
  console.log("Showing employee by Managers...\n");
  const sql = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager, CONCAT(e.first_name, ' ', e.last_name) AS employee
               FROM employee e
               INNER JOIN employee m ON e.manager_id = m.id
               ORDER BY manager, employee`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    const groupedEmployees = result.reduce((acc, curr) => {
      if (acc[curr.manager]) {
        acc[curr.manager].push(curr.employee);
      } else {
        acc[curr.manager] = [curr.employee];
      }
      return acc;
    }, {});

    const managerEmployeePairs = Object.entries(groupedEmployees).map(
      ([manager, employees]) => ({
        manager,
        employees,
      })
    );

    console.table(managerEmployeePairs);
    // restart the application
    startingQuestion();
  });
};

// function to add an employee
function addEmployee() {
  const sql2 = `SELECT * FROM employee`;
  db.query(sql2, (err, response) => {
    if (err) throw err;
    employeeList = response.map((employees) => ({
      name: employees.first_name.concat(" ", employees.last_name),
      value: employees.id,
    }));

    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (err, response) => {
      if (err) throw err;
      roleList = response.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const sql4 = `SELECT * FROM department`;
      db.query(sql4, (err, response) => {
        if (err) throw err;
        departmentList = response.map((departments) => ({
          name: departments.name,
          value: departments.id,
        }));

        return inquirer
          .prompt([
            {
              type: "input",
              name: "first",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "last",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "department",
              message: "Which Department does the role belong to?",
              choices: departmentList,
            },
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roleList,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the employee's manager?",
              choices: employeeList,
            },
          ])
          .then((answers) => {
            const sql = `INSERT INTO employee SET first_name='${answers.first}', last_name= '${answers.last}', role_id= ${answers.role}, manager_id=${answers.manager};`;
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log(
                "Added " +
                  answers.first +
                  " " +
                  answers.last +
                  " to the database as an employee."
              );
              // showing all the employees
              viewEmployees();
            });
          });
      });
    });
  });
}

// function to delete employees
const deleteEmployee = () => {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to delete?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        db.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");
          // showing all the employees
          viewEmployees();
        });
      });
  });
};

// function to update an employee
const updateEmployee = () => {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        db.query(roleSql, (err, data) => {
          if (err) throw err;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated!");
                // showing all the employees
                viewEmployees();
              });
            });
        });
      });
  });
};

// function to update an employee Manager
const updateEmployeeManager = () => {
  // get employees from employee table
  const employeeSql = `SELECT * FROM employee`;

  db.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);

        inquirer
          .prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is the employee's new manager?",
              choices: employees,
            },
          ])
          .then((managerChoice) => {
            const employee = managerChoice.manager;
            params.push(employee);

            let employee1 = params[0];
            params[0] = employee;
            params[1] = employee1;

            // console.log(params)

            const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Employee has been updated!");
              // showing all the employees
              viewEmployees();
            });
          });
      });
  });
};
// ********* End Employee Function ******** //

// ********* Start Role Function ******** //
// function to view all roles
function viewRoles() {
  const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // restart the application
    startingQuestion();
  });
}

// function to add a role
function addRole() {
  const sql2 = `SELECT * FROM department`;
  db.query(sql2, (err, response) => {
    if (err) throw err;
    departmentList = response.map((departments) => ({
      name: departments.name,
      value: departments.id,
    }));
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which Department does the role belong to?",
          choices: departmentList,
        },
      ])
      .then((answers) => {
        const sql = `INSERT INTO role SET title='${answers.title}', salary= ${answers.salary}, department_id= ${answers.department};`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          console.log(
            "Added " + answers.title + " to the database with new role"
          );
          // showing all the roles
          viewRoles();
        });
      });
  });
}

// function to delete role
const deleteRole = () => {
  // retrieve all available roles from the database
  const deleteSql = `SELECT * FROM role`;

  db.query(deleteSql, (err, data) => {
    if (err) throw err;
    
    // map through the retrieved roles to create an array of choices
    const choices = data.map((role) => ({
      name: `${role.title} (${role.id}) - ${role.salary}`,
      value: role.id,
    }));

    // add a "Go Back" option to the list of choices
    choices.push({ name: "Go Back", value: null });
    
    inquirer
      .prompt({
        type: "list",
        name: "roleId",
        message: "Select the role you want to delete:",
        choices: choices,
      })
      .then((answer) => {
        // check if the user chose the "Go Back" option
        if (answer.roleId === null) {
          // go back to the deleteDepartmentsRolesEmployees function
          deleteDepartmentsRolesEmployees();
          return;
        }
        
        const query = "DELETE FROM role WHERE id = ?";
        db.query(query, [answer.roleId], (err, data) => {
          if (err) throw err;
          console.log(`Deleted role with ID ${answer.roleId} from the database!`);
          
          // show all roles
          viewRoles();
        });
      });
  });
};


// function to update a employee role
function updateRole() {
  const sql2 = `SELECT * FROM employee`;
  db.query(sql2, (err, response) => {
    if (err) throw err;
    employeeList = response.map((employees) => ({
      name: employees.first_name.concat(" ", employees.last_name),
      value: employees.id,
    }));
    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (err, response) => {
      if (err) throw err;
      roleList = response.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      return inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "role",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager",
            message: "Who will be this employee's manager?",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          const sql = `UPDATE employee SET role_id= ${answers.role}, manager_id=${answers.manager} WHERE id =${answers.employee};`;
          db.query(sql, (err, result) => {
            if (err) throw err;
            console.log("Employee role updated");
            // showing all the employees
            viewEmployees();
          });
        });
    });
  });
}

// ********* End Role Function ******** //

// ********* Start Department Function ******** //

// function to view all departments
function viewDepartments() {
  const sql = `SELECT department.id, department.name AS Department FROM department;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    // restart the application
    startingQuestion();
  });
}

// function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department(name) VALUES('${answer.department}');`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Added " + answer.department + " to the database");
        // showing all department
        viewDepartments();
      });
    });
}

// function to delete department
const deleteDepartment = () => {
  const deptSql = `SELECT * FROM department`;

  db.query(deptSql, (err, data) => {
    if (err) throw err;

    const dept = data.map(({ name, id }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "What department do you want to delete?",
          choices: dept,
        },
      ])
      .then((deptChoice) => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        db.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");
          // showing all department
          viewDepartments();
        });
      });
  });
};
// ********* End Department Function ******** //

// Function to view Total Utilized Budget of Department
function viewTotalUtilizedBudgetOfDepartment() {
  const sql2 = `SELECT * FROM department`;
  db.query(sql2, (err, response) => {
    if (err) throw err;
    const departmentList = response.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    // prompt the user to select a department
    inquirer
      .prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which department do you want to calculate the total salary for?",
        choices: departmentList,
      })
      .then((answer) => {
        // calculate the total salary for the selected department
        const query = `SELECT 
                    department.name AS department,
                    SUM(role.salary) AS total_salary
                  FROM 
                    department
                    INNER JOIN role ON department.id = role.department_id
                    INNER JOIN employee ON role.id = employee.role_id
                  WHERE 
                    department.id = ?
                  GROUP BY 
                    department.id;`;
        db.query(query, [answer.departmentId], (err, response) => {
          if (err) throw err;
          const totalSalary = response[0].total_salary;
          console.log(
            ` The total salary for employees in this department is $${totalSalary}.00`
          );
          // restart the application
          startingQuestion();
        });
      });
  });
}

// Function to DELETE Departments Roles Employees
function deleteDepartmentsRolesEmployees() {
  inquirer
      .prompt({
          type: "list",
          name: "data",
          message: "What would you like to delete?",
          choices: ["Employee", "Role", "Department"],
      })
      .then((answer) => {
          switch (answer.data) {
              case "Employee":
                  deleteEmployee();
                  break;
              case "Role":
                  deleteRole();
                  break;
              case "Department":
                  deleteDepartment();
                  break;
              default:
                  console.log(`Invalid data: ${answer.data}`);
                   // restart the application
              startingQuestion();
                  break;
          }
      });
    }
