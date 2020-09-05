const mysql = require('mysql');
const inquirer = require('inquirer');
const prompts = require('./prompts');
const db = require('./db');

async function updateManager(arr) {
    const staff = await db.viewEmployees();

    for (var i = 0; i < arr.length; i++) {

        let manager = arr[i].Manager;

        for (var j = 0; j < staff.length; j++) {
            if (staff[j].ID === manager) {
                arr[i].Manager = staff[j].First + " " + staff[j].Last;
            }
        }
    }
}

function delayMenu() {
    setTimeout(function() {
        runMenu()
    }, 1000);
}

async function viewEmployees() {
    const employees = await db.viewEmployees();

    await updateManager(employees);

    console.log('\n');
    console.table(employees);
    console.log('\n');

    delayMenu();
}

async function viewDepartment(dept) {
    const department = await db.viewDepartment(dept);

    await updateManager(department);

    console.log('\n');
    console.table(department);
    console.log('\n');

    delayMenu();
}

async function viewRole(role) {
    const roles = await db.viewRole(role);

    await updateManager(roles);

    console.log('\n');
    console.table(roles);
    console.log('\n');

    delayMenu();
}

async function addEmployee(first, last, role, man) {
    await db.addEmployee(first, last, role, man);

    viewEmployees();
}

async function addDepartment(dept) {
    await db.addDepartment(dept);

    console.log('\n');
    console.log("New Department Succesfully Added!");
    console.log('\n');

    delayMenu();
}

async function addRole(title, sal, dept) {
    await db.addRole(title, sal, dept);

    console.log('\n');
    console.log("New Role Succesfully Added!");
    console.log('\n');

    delayMenu();
}

async function updateRole(role, empId) {
    await db.updateRole(role, empId);

    console.log('\n');
    console.log("Role Succesfully Updated!");
    console.log('\n');

    delayMenu();
}

runMenu();

const currentRoles = [];

const employeeNamesArr = [];

async function getRolesArr() {
    const allRoles =  await db.getRoles()
        
    for (var i = 0; i < allRoles.length; i++) {

        let role = allRoles[i].title;

        if (!currentRoles.includes(role)) {
            currentRoles.push(role);
        }
    }
}

async function getRoleID(res) {
    const roleID = await db.getRoleID(res);
    role = roleID[0].id;
    console.log(roleID);
}

async function convertManagerToId(res) {
    let splitManArr = res.split(" ");
    let manFirst = splitManArr[0];
    let manLast = splitManArr[1];
    const managerID = await db.getManager(manFirst, manLast);
    manager = managerID[0].id;
}

async function getEmployeeNamesArr() {
    const employeeArr = await db.getEmployees();
        
    for (var i = 0; i < employeeArr.length; i++) {
        let employee = employeeArr[i].first_name + " " + employeeArr[i].last_name;
        if (!employeeNamesArr.includes(employee)) {
            employeeNamesArr.push(employee);
        }
    }
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
                    viewRole();
                    break;
                case "Add employee":
                    addEmployeeQuestions();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update role of an employee":
                    updateRole();
                    break;
            }
        })
};

async function addEmployeeQuestions() {
    await getRolesArr();
    await getEmployeeNamesArr();
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
        }]).then( async function(res) {

            await getRoleID(res.role);
            await convertManagerToId(res.manager);

            // role is undefined here

            addEmployee(res.firstName, res.lastName, role, manager);
        })
}

