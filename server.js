const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Huskies7',
  database: 'employees_db'
});

connection.connect(function (err) {
  if (err) throw err;
  runMenu();
});

const currentRoles = [];

const currentEmployees = [];

const employeeNamesArr = [];

function getCurrentRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            let role = res[i].title;
            if (!currentRoles.includes(role)) {
                currentRoles.push(role);
            }
        }
    })
}

function getCurrentEmployeeNames() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            let employee = res[i].first_name + " " + res[i].last_name;
            if (!employeeNamesArr.includes(employee)) {
                employeeNamesArr.push(employee);
            }
        }
    })
}

function runMenu() {
    inquirer   
        .prompt({
            name: "menuChoice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View employees by department",
                "View employees by role",
                "Add employee",
                "Add department",
                "Add role",
                "Update role of an employee"
            ]
        }).then( function(answer) {
            switch (answer.menuChoice) {
                case "View all employees":
                    // run view employees function
                    break;
                case "View employees by department":
                    // run view employees by department function
                    break;
                case "View employees by role":
                    // run view employees by role function
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Add department":
                    // run add department function
                    break;
                case "Add role":
                    // run add role function
                    break;
                case "Update role of an employee":
                    // run update employees role function
                    break;
            }
        })
};

function addEmployee() {
    getCurrentRoles();
    getCurrentEmployeeNames();
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: currentRoles
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: employeeNamesArr
        }]).then(function(res) {
            console.log(res);
        })
}

