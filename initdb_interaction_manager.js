const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database, or create it if it doesn't exist
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    // Enable foreign key support
    db.exec('PRAGMA foreign_keys = ON;', err => {
        if (err) {
            console.error("Pragma statement didn't work.");
        } else {
            console.log("Foreign key enforcement is enabled.");
        }
    });
});

// SQL commands adjusted for SQLite3
const sqlCommands = `
CREATE TABLE user(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT(50) DEFAULT NULL,
    last_name TEXT(50) DEFAULT NULL,
    title TEXT(50) DEFAULT NULL,
    department TEXT(50) DEFAULT NULL,
    work_phone TEXT(50) DEFAULT NULL,
    reports_to INT,
    date_entered TEXT(50) DEFAULT NULL,
    date_modified TEXT(50) DEFAULT NULL,
    modified_by INT,
    username TEXT(50) DEFAULT NULL,
    STATUS TEXT(50) DEFAULT NULL,
    user_email TEXT(50) DEFAULT NULL,
	password TEXT(255) DEFAULT NULL
);

CREATE TABLE client(
    client_id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT(255) DEFAULT NULL,
    website TEXT(255) DEFAULT NULL,
    address_street TEXT(150) DEFAULT NULL,
    address_city TEXT(100) DEFAULT NULL,
    address_province TEXT(100) DEFAULT NULL,
    address_postalcode TEXT(20) DEFAULT NULL,
    address_country TEXT(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    company_email TEXT(100) DEFAULT NULL,
    date_created DATE NOT NULL,
    date_modified DATE DEFAULT NULL,
    created_by int
); 

CREATE TABLE ticket(
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INT,
    user_id INT,
	reason TEXT(50) DEFAULT NULL,
    comments TEXT(1024) DEFAULT NULL,
    date_created DATE,
	status TEXT(15) NOT NULL,
    FOREIGN KEY(client_id) REFERENCES client(client_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
); 
  
INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
(1, 'admin', 'admin', 'admin', 'admin', NULL, 1, NULL, '2020/12/08', 1, 'admin', '0', 'admin@interaction_manager.com', 'admin');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (2, 'User1', 'User1', 'User1', 'User1', NULL, 1, NULL, '2020/12/08', 1, 'User1', '0', 'User1@interaction_manager.com', 'User1');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (3, 'User2', 'User2', 'User2', 'User2', NULL, 1, NULL, '2020/12/08', 1, 'User2', '0', 'User2@interaction_manager.com', 'User2');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (4, 'User3', 'User3', 'User3', 'User3', NULL, 1, NULL, '2020/12/08', 1, 'User3', '0', 'User3@interaction_manager.com', 'User3');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (5, 'User4', 'User4', 'User4', 'User4', NULL, 1, NULL, '2020/12/08', 1, 'User4', '0', 'User4@interaction_manager.com', 'User4');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (6, 'User5', 'User5', 'User5', 'User5', NULL, 1, NULL, '2020/12/08', 1, 'User5', '0', 'User5@interaction_manager.com', 'User5');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (7, 'User6', 'User6', 'User6', 'User6', NULL, 1, NULL, '2020/12/08', 1, 'User6', '0', 'User6@interaction_manager.com', 'User6');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (8, 'User7', 'User7', 'User7', 'User7', NULL, 1, NULL, '2020/12/08', 1, 'User7', '0', 'User7@interaction_manager.com', 'User7');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (9, 'User8', 'User8', 'User8', 'User8', NULL, 1, NULL, '2020/12/08', 1, 'User8', '0', 'User8@interaction_manager.com', 'User8');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (10, 'User9', 'User9', 'User9', 'User9', NULL, 1, NULL, '2020/12/08', 1, 'User9', '0', 'User9@interaction_manager.com', 'User9');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (11, 'UserA', 'UserA', 'UserA', 'UserA', NULL, 1, NULL, '2020/12/08', 1, 'UserA', '0', 'UserA@interaction_manager.com', 'UserA');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (12, 'UserB', 'UserB', 'UserB', 'UserB', NULL, 1, NULL, '2020/12/08', 1, 'UserB', '0', 'UserB@interaction_manager.com', 'UserB');

INSERT INTO user (user_id, first_name, last_name, title, department, work_phone, reports_to, date_entered, date_modified, modified_by, username, STATUS, user_email, password) VALUES
    (13, 'UserC', 'UserC', 'UserC', 'UserC', NULL, 1, NULL, '2020/12/08', 1, 'UserC', '0', 'UserC@interaction_manager.com', 'UserC');

`;

// Execute SQL commands
db.exec(sqlCommands, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database tables created and data inserted successfully.');
});

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});
