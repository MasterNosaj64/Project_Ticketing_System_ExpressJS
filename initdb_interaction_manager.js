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
