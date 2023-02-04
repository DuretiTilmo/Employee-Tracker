const mysql = require('mysql2');
const inquirer = require('inquirer');
// const { default: inquirer } = require('inquirer');

const promptUser = () => { 
   return inquirer.prompt ([
    {
       type: "list",
       name: "startApp",
       message: "What would you like to do?",
       choices : [ "View all departments\n", "View all roles\n", "View all employees\n", "Add a department\n", "Add a role\n", "Add an employee\n", "Update an employee role"]
    },
 
])
}

const viewDepartment = () => {
    return inquirer
    .prompt()
    //show department table 

    promptUser();
}


const viewRole = () => {
    return inquirer
    .prompt()
    //show role table 
    promptUser();
}

const viewEmployees = () => {
    return inquirer
    .prompt()
    //show employee table 
    promptUser();
}

// if the user wants to add a department (we push the newly added department in to the department table after this)
const addDepartment = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
        }
    ])
    promptUser();
}

// if the user wants to add a role (we push the newly added role in to the role table after this)
const addRole = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "newDepart",
            message: "Which department does  the role belong to?",
            choices: ["Engineering\n", "Finance\n", "Legal\n", "Sales\n",  " "]
        }

    ])
    promptUser();
}

// if the user wants to add a employee
const addEmployee = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "newRole",
            message: "What is the employee's role?",
            choices: ["Accountant\n", "Legal Team lead\n", "Lawyer\n", "Lead Engineer\n", "Sales person\n", "Sales Lead\n", "Engineer\n", "Account Manager\n",  "  "]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: ["Moti Mike\n", "Mina Ali\n", "Sarah Mat\n", "Jack Bill\n", "Kiya Dell\n", "Samer Jamal\n", "Tom Jerry\n", "Adam Abdul\n", "None"]
        }
    ])
    promptUser();
}

// if the user wants to update an employee role 
const updateRole = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "employeeUpdate",
            message: "Which employee's role do you want to update?",
            choices: ["Moti Mike\n", "Mina Ali\n", "Sarah Mat\n", "Jack Bill\n", "Kiya Dell\n", "Samer Jamal\n", "Tom Jerry\n", "Adam Abdul\n", " (newly added role)"]

        },
        {
            type: "list",
            name: "roleUpdate",
            message: "Which role do you want to assign the selected employee?",
            choices: ["Accountant\n", "Legal Team lead\n", "Lawyer\n", "Lead Engineer\n", "Sales person\n", "Sales Lead\n", "Engineer\n", "Account Manager\n",  "  "]
        }

    ])
    promptUser();
}