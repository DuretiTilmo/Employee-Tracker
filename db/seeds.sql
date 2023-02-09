INSERT INTO department (id, name)
VALUES (45, "Engineering"),
       (67, "Finance"),
       (23, "Legal"),
       (33, "Sales");


INSERT INTO role1 (title, salary, department_id)
VALUES ("Sales Lead", 5000, 33),
       ("Salesperson", 4000, 33),
       ("Lead Engineer", 5600, 45),
       ("Software Engineer", 4900, 45),
       ("Account Manager", 5500, 67),
       ("Accountant", 4500, 67),
       ("Legal Team Lead", 5500, 23),
       ("Lawyer", 5200, 23);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Moti", "Mike", 1, null),
       ("Mina", "Ali", 2,  null),
       ("Sarah", "Mat", 3, null),
       ("Jack", "Bill", 4, null),
       ("Kiya", "Dell", 5, null),
       ("Samer", "Jamal", 6, null),
       ("Tom", "Jerry", 7, null),
       ("Adam", "Abdul", 8, null);

