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
                    // run add employees function
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

