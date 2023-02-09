require('dotenv').config()
const dotenv = require('dotenv')
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

let choice = '';

// to get department id and names
let departmentNameAndId = [];
let departmentNames =[];

// to get employee roles and thier managers

let employeeRoleandId = [];
let employeeRoles = [];
let managersName = [];
let managersNameandId = [];

let nameAndId = [];
let titleAndId = [];
let myEmployees= [];
let myRoles = [];
// Connect to database
const db = mysql.createConnection(
  {
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const promptUser = [
   {
      type: "list",
      name: "startApp",
      message: "What would you like to do?",
      choices : [ "View all departments", "View all roles", "View all employees", "View employees by department",  "Add a department", "Add a role", "Add an employee", "Update an employee role\n"]
   },
]
  // View department
  const getDepartment = () => {
    const sql = `SELECT id as department_id, name as department FROM department`;
    db.query(sql, (err, rows) => {
      console.table(rows);
     
      init();
    });
  };

  const getDepartmentNames = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      for (i = 0; i < rows.length; i++) {
         departmentNames.push(rows[i].name);
         departmentNameAndId.push(rows[i]);

      }
      // console.log(rows);

    });
  };
  const getDepartmentId = (depName) => {

  for(i = 0; i < departmentNameAndId.length; i++) {
    if (departmentNameAndId[i].name === depName) {
      return departmentNameAndId[i].id;
    }
  }
  };

// Create a department
const addDepartment = [
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
        }
    ]

  // View role
  const getRole = () => {
    const sql = `SELECT id, title, salary, department_id FROM role1`;
    db.query(sql, (err, rows) => {
      console.table(rows);
      init();
    });
  };

  // Create a role
 const addRole = [
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
        name: "departmentName",
        message: "Which department does  the role belong to?",
        choices: departmentNames
    }
]
   // View list of all employees and associated info using JOIN
const getEmployee = () => {
    const sql = `SELECT employee.id,employee.first_name, employee.last_name, employee.manager_id, role1.salary, role1.title, department.name as department FROM employee JOIN role1 ON employee.role_id = role1.id JOIN department ON department.id = role1.department_id;`;
    
    db.query(sql, (err, result) => {
       
      console.table(result);
      init();
    });
  };

  const getEmployeeNames = () => {
    const sql = `SELECT  id, title from role1`;
    
    db.query(sql, (err, rows) => {
      for (i = 0; i < rows.length; i++) {
      
        employeeRoles.push(rows[i].title);

        employeeRoleandId.push(rows[i]);
      }
      
    });
  };
// to select the manager for the new employee
  const getRoleId = (title) => {
      for (i = 0; i < employeeRoleandId.length; i++) {
        if (employeeRoleandId[i].title === title) {
           return employeeRoleandId[i].id;
        }
      }
  
  }

  const getMangerName = () =>{
    const sql = `SELECT id, CONCAT(first_name ,' ' , last_name) AS 'full_name' FROM employee;`;

    db.query(sql, (err, rows) => {
      for (i = 0; i < rows.length; i++) {
        managersNameandId.push(rows[i]);
           managersName.push(rows[i].full_name);
      }
    });
  }

  const getManagerId = (name) => {
      for (i = 0; i < managersNameandId.length; i++) {
        // console.log(managersNameandId[i]);
        if (managersNameandId[i].full_name === name) {
       
           return managersNameandId[i].id;
         
        }
      }
    }
// Add employee
const addEmployee = [
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
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: employeeRoles
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: managersName
        }
    ]
    
// if the user wants to update an employee role 
const updateRole = [
      {
          type: "list",
          name: "employeeUpdate",
          message: "Which employee's role do you want to update?",
          choices: myEmployees

      },
      {
          type: "list",
          name: "roleUpdate",
          message: "Which role do you want to assign the selected employee?",
          choices: myRoles
      }

  ]
const init = () => {
  getDepartmentNames();
  getEmployeeNames();
  getRoleId();
  getMangerName();
  getAllRoles();
  getAllEmployee();
  inquirer.prompt(promptUser)

  .then((data) => {
      const { startApp } = data;
      choice = startApp;
  })
  .then (() => {
      if (choice == "View all departments") {
          getDepartment();
          //  promptUser();

      } else if (choice == "View all roles") {
          getRole();
          // promptUser();
      
      } else if (choice == "View all employees") {
          getEmployee();
          // promptUser();
        } else if (choice == "View employees by department") {
          getEmployeeAndDepart();  
      } else if (choice == "Add a department") {
          newDepartment();   
          // promptUser();

      } else if (choice == "Add a role") {
          newRole();
          // promptUser();

      } else if (choice == "Add an employee") {
          newEmployee();

      } else if (choice == "Update an employee role") {
            updatedRole();     
            updateEmployee();
            // updateEmployee();

      }
      // getEmployeeNames();
  })
  .catch((err) => console.error(err));

};

const newDepartment = () => {
   inquirer.prompt(addDepartment)
     .then((data) => {
      const { department } = data;
    //  console.log(department);
   
     const sql = `INSERT INTO department (name) VALUES (?)`;
   const params = [department];
   
   db.query(sql, params, (err, result) => {
     console.table(result);
    // console.log(result)
      init();
   });
  });

  }

const newRole = () => {
inquirer.prompt(addRole)
     .then((data) => {

      const {role, salary, departmentName} = data;

     const sql = `INSERT INTO role1 (title, salary, department_id) VALUES (?, ?, ?)`;

   let id = getDepartmentId(departmentName);
    //  console.log(id);
       const params = [role, salary, id ];

   db.query(sql, params, (err, result) => {   
    //  console.table(result);
     
       init();
   });

  });
}

const newEmployee = () => {
  inquirer.prompt(addEmployee)
     .then ((data) => {
 
      const {firstName, lastName, employeeRole, manager} = data;

  //  console.log(data);
     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

    let roleId = getRoleId(employeeRole);
    // console.log(employeeRole);
    // console.log(roleId);

    let managerId = getManagerId(manager);
  //  console.log(manager);
         const params = [firstName, lastName, roleId, managerId];
     
       db.query(sql, params, (err, rows) => {

    // console.table(rows);

    // console.log(params);

    init();
  });
});
} 
// View employees by their department
const getEmployeeAndDepart = () => {
  const sql = `SELECT concat(employee.first_name,' ', employee.last_name) as 'full_name', department.name as department FROM employee JOIN role1 ON employee.role_id = role1.id JOIN department ON department.id = role1.department_id;`;
  
  db.query(sql, (err, result) => {
     
    console.table(result);
    init();
  });
};


const getAllRoles = () => {
  const sql = `SELECT id, title from role1`;
  db.query(sql, (err, rows) => {
    for (i = 0; i < rows.length; i++) {
    
      myRoles.push(rows[i].title);

      titleAndId.push(rows[i]);
    }
    
  });
}

const getTitleAndId = (role) => {
  for (i = 0; i < titleAndId.length; i++) {
    if (titleAndId[i].title === role) {
       return titleAndId[i].id;
    }
  }
}

const getAllEmployee = () =>{
  const sql = `SELECT id, CONCAT(first_name ,' ' , last_name) AS 'full_name' FROM employee;`;

  db.query(sql, (err, rows) => {
    for (i = 0; i < rows.length; i++) {
      nameAndId.push(rows[i]);
         myEmployees.push(rows[i].full_name);
    }
  });
}

const getEmployeeId = (name) => {
  for (i = 0; i < nameAndId.length; i++) {
    // console.log(nameAndId[i]);
    if (nameAndId[i].full_name === name) {
   
       return nameAndId[i].id;
     
    }
  }
}

// // Update employee role
const updateEmployee = () => {
  inquirer.prompt(updateRole)
  .then((data) => { 

    const [ employeeUpdate] = data
  const sql = `UPDATE employee SET employee.first_name = first_name and employee.last_name = last_name WHERE first_name ANd last_name;`;

  let employee = getEmployeeId(employeeUpdate); 

  const params = [employee];

  db.query(sql, params, (err, result) => {
    for (i = 0; i < result.length; i++) {
      myRoles.push(result[i].id);
  //     myEmployees.push(result[i].full_name);
   }
  // console.log(result);
    // console.table(result);
    
    init();
  });
})
//   //  console.table(rows);
    
  };

const updatedRole = () => {
  // updateEmployee();
  inquirer.prompt(updateRole)
  .then((data) => { 

    const [roleUpdate] = data
  const sql = `UPDATE role1 SET id = id WHERE id ; `
  // UPDATE role1 SET role1.title = title WHERE title;

let role = getTitleAndId(roleUpdate);

  const params = [role]

      db.query(sql, params, (err, result) => {
    for (i = 0; i < result.length; i++) {
  //     myRoles.push(result[i].id);
      myEmployees.push(result[i].full_name);
   }
  // console.log(result);
    // console.table(result);
    
    init();
  });

 })
};

  init();

