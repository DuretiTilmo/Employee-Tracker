INSERT INTO department (id, name)
VALUES (0045, "Engineering"),
       (0067, "Finance"),
       (0023, "Legal"),
       (0033, "Sales");


INSERT INTO role1 (title, salary, department_id)
VALUES ("Sales Lead", 5.9, 0033),
       ("Salesperson", 5.7, 0033),
       ("Lead Engineer", 5.6, 0045),
       ("Software Engineer", 4.9, 0045),
       ("Account Manager", 5.5, 0067),
       ("Accountant", 4.9, 0067),
       ("Legal Team Lead", 5.5, 0023),
       ("Lawyer", 5.2, 0023);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (89890, "Moti", "Mike", 1, null),
       (45450, "Mina", "Ali", 2, 45450),
       (23230, "Sarah", "Mat", 3, 23230),
       (67670, "Jack", "Bill", 4, 67670),
       (12120, "Kiya", "Dell", 5, 12120),
       (56560, "Samer", "Jamal", 6, 56560),
       (74740, "Tom", "Jerry", 7, 74740),
       (91910, "Adam", "Abdul", 8, 91910);

