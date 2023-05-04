INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
         ("House keeping"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Robert", "Chavez", 1, null),
        ("Ashly", "Young", 2, 1),
        ("Carolina", "Rodriguez", 3, null),
        ("Kevin", "Bruyne", 4, 3),
        ("Peter", "Shivak", 5, null),
        ("Myra", "Shah", 6, 7),
        ("Sarah", "Johnson", 7, null),
        ("Jeremy", "Boating", 8, 5);