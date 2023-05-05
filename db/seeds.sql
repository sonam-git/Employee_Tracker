INSERT INTO department (name)
VALUES  ('Executive Board'),
        ('Marketing'),
        ('Human Resources'),
        ('Finance'),
        ('Engineering'),
        ('Information Technology'),
        ('Customer Relations'),
        ('Research and Development'),
        ('Legal'),
        ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES  ('Executive Officer', 555000.00, 1),
        ('Marketing Manager', 125000.00, 2),
        ('HR Director', 189000.00, 3),
        ('Finance Head', 145000.00, 4),
        ('Senior Engineer', 185000.00, 5),
        ('IT Manager', 125000.00, 6),
        ('CR Manager', 75000.00, 7),
        ('R andD Manager ', 185000.00, 8),
        ('Legal Manager', 95000.00, 9),
        ('Maintenance Manager', 135000.00, 10);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Brown', 1, 1),
('Tashi', 'Sherpa', 2, 2),
('Jose', 'Garcia', 3, 3),
('Brenda', 'Moreno', 4, 4),
('Thomas', 'Tuchel', 5, 5),
('David', 'Moyes', 6, 6),
('Camila', 'Chavez', 7, 7),
('James', 'Rodriguez', 8, 8),
('Sonam', 'Sherpa', 9, 9),
('Michal', 'Jordan', 10, 10);