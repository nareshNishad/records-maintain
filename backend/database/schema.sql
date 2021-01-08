DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_No INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    math_Marks INTEGER NOT NULL,
    physics_Marks INTEGER NOT NULL,
    chemistry_Marks INTEGER NOT NULL,
    total_Marks INTEGER NOT NULL,
    percentage INTEGER NOT NULL
);
