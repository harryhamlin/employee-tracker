INSERT INTO department (name)
VALUES ("hr"),
       ("accounting"),
       ("sales"),
       ("management");

INSERT INTO role (title, salary, department_id)
VALUES ("hr manager", 50000, 1),
       ("recruiter", 40000, 1),
       ("accounting manager", 50000, 2),
       ("accountant", 40000, 2),
       ("sales manager", 60000, 3),
       ("sales lead", 45000, 3),
       ("ceo", 120000, 4),
       ("cfo", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("tim", "tebow", 1, 7),
        ("ezra", "lane", 2, 1),
        ("eugene", "mack", 3, 8),
        ("julien", "rodriguez", 4, 3),
        ("hunter", "barr", 5, 8),
        ("alec", "grant", 6, 5),
        ("abdullah", "bradford", 7, null),
        ("belen", "jensen", 8, 7);

       
