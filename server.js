const mysql = require('mysql');
const inquirer = require('inquirer');
const prompts = require('./prompts');
const db = require('./db');

function updateManager(arr) {
    for (var i = 0; i < arr.length; i++) {

        let manager = arr[i].Manager;

        for (var j = 0; j < arr.length; j++) {
            if (arr[j].ID === manager) {
                arr[i].Manager = arr[j].First + " " + arr[j].Last;
            }
        }
    }
}

async function viewEmployees() {
    const employees = await db.viewEmployees();

    updateManager(employees);

    console.log('\n');
    console.table(employees);
    console.log('\n');

    setTimeout(function() {
        runMenu()
    }, 1000);
}

async function viewDepartment() {
    const department = await db.viewDepartment();

    updateManager(department);

    console.log('\n');
    console.table(department);
    console.log('\n');

    setTimeout(function() {
        runMenu()
    }, 1000);
}

runMenu();

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

function getRoleID(answer) {
    connection.query("SELECT * FROM role WHERE title = ?", [answer.role], function(err, response) {
        if (err) throw err;
        console.log(response[0].id);
        roleID = response[0].id;
    })
}

function getManagerID(answer) {
    manager = answer.manager.split(" ");

    connection.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ?", [manager[0], manager[1]], function(err, response) {
        if (err) throw err;
        managerID = response[0].id;
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
                    viewEmployees();
                    break;
                case "View employees by department":
                    viewDepartment();
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

            const roleID = getRoleID(res);
            const managerID = getManagerID(res);

            setTimeout(function() {
                const query = connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: res.firstName,
                        last_name: res.lastName,
                        role_id: roleID,
                        manager_id: managerID
                    })
                console.log(query.sql);
            }, 2000);
        })
}

