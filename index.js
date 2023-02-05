const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const Department = require("./classes/Department.js");
const Employee = require("./classes/Employee.js");
const Role = require("./classes/Role.js");

let choice = '';

const promptUser = () => { 
   return inquirer.prompt ([
    {
       type: "list",
       name: "startApp",
       message: "What would you like to do?",
       choices : [ "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
 
])
}

const viewDepartment = () => {
    console.table([
        { department_id: 0045,
          name: "Engineering"
        },
        { department_id: 0067,
            name: "Finance"
        },
        { department_id: 0023,
            name: "Legal"
        },
        { department_id: 0033,
            name: "Sales"
        }
    ])
}

const viewRole = () => {
    console.table([
        { id: 1,
          title: "Sales Lead",
          salary: 5.9, 
          department_id: 0033       
        },
        { id: 2,
            title: "Salesperson",
            salary: 5.7, 
            department_id: 0033  
        },
        { id: 3,
            title: "Lead Engineer",
            salary: 5.6, 
            department_id: 0045  
        },
        { id: 4,
            title: "Software Engineer",
            salary: 4.9, 
            department_id: 0045  
        },
        { id: 5,
            title: "Account Manager",
            salary: 5.5, 
            department_id: 0067  
        },
        { id: 6,
            title: "Accountant",
            salary: 4.9, 
            department_id: 0067  
        },
        { id: 7,
            title: "Legal Team Lead",
            salary: 5.5, 
            department_id: 0023  
        },
        { id: 8,
            title: "Lawyer",
            salary: 5.2, 
            department_id: 0023  
        }

    ])
    
}

const viewEmployees = () => {
    console.table([
        { id: 89890,
           first_name: "Moti",
           last_name: "Mike", 
           manager_id: null       
        },
        { id: 45450,
            first_name: "Mina",
            last_name: "ALi", 
            manager_id: 89890  
        },
        { id: 23230,
            first_name: "Sarah",
            last_name: "Mat", 
            manager_id: 89890  
        },
        { id: 67670,
            first_name: "Jack",
            last_name: "Bill", 
            manager_id: 89890  
        },
        { id: 12120,
            first_name: "Kiya",
            last_name: "Dell", 
            manager_id: 89890  
        },
        { id: 56560,
            first_name: "Samer",
            last_name: "Jamal", 
            manager_id: 12120 
        },
        { id: 74740,
            first_name: "Tom",
            last_name: "Jerry", 
            manager_id: 12120 
        },
        { id: 91910,
            first_name: "Adam",
            last_name: "Abdul", 
            manager_id: 12120  
        }

    ])
    
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
            choices: ["Engineering", "Finance", "Legal", "Sales",  " "]
        }

    ])
    
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
            choices: ["Accountant", "Legal Team lead", "Lawyer", "Lead Engineer", "Sales person", "Sales Lead", "Engineer", "Account Manager",  "  "]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: ["Moti Mike", "Mina Ali", "Sarah Mat", "Jack Bill", "Kiya Dell", "Samer Jamal", "Tom Jerry", "Adam Abdul", "None"]
        }
    ])
    
}

// if the user wants to update an employee role 
const updateRole = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "employeeUpdate",
            message: "Which employee's role do you want to update?",
            choices: ["Moti Mike", "Mina Ali", "Sarah Mat", "Jack Bill", "Kiya Dell", "Samer Jamal", "Tom Jerry", "Adam Abdul", " (newly added role)"]

        },
        {
            type: "list",
            name: "roleUpdate",
            message: "Which role do you want to assign the selected employee?",
            choices: ["Accountant", "Legal Team lead", "Lawyer", "Lead Engineer", "Sales person", "Sales Lead", "Engineer", "Account Manager",  "  "]
        }

    ])
    
}

const init = () => {
    promptUser()
    .then((data) => {
        const { startApp } = data;
        choice = startApp;
    })
    .then (() => {
        if (choice == "View all departments") {
             viewDepartment();
             promptUser();

        } else if (choice == "View all roles") {
            viewRole();
            promptUser();
        
        } else if (choice == "View all employees") {
            viewEmployees();
            promptUser();

        } else if (choice == "Add a department") {
            newDepartment();   
            // promptUser();

        } else if (choice == "Add a role") {
            newRole();
            // promptUser();

        } else if (choice == "Add an employee") {
            newEmployee();

        } else if (choice == "Update an employee role") {
              updateRole();      
        }

    //  promptUser();

    })
    .catch((err) => console.error(err));

};

const newDepartment = () => {
    addDepartment()
       .then((data) => {
        let input= '';
        const { department_id, name} = data;
        const department = new Department(department_id, name)

        // department.push(input)
       })
}

const newRole = () => {
    addRole()
       .then((data) => {
        let input= '';
        const { role_id, title, salary} = data;
        const role = new Role(role_id, title, salary)

        // role.push(input);
       })
}

const newEmployee = () => {
    addEmployee()
       .then ((data) => {
        let input= '';
        const {id, first_name, last_name, manager_id} = data;
        const employee = new Employee(id, first_name, last_name, manager_id)

        // employee.push(input);
       })
} 


init();



