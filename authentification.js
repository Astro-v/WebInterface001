const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL123-_',
    database: 'login_database'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

function checkCredentials(username, password) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.log(err);
                reject('Error when trying to log in');
            } else if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                        reject('Error when trying to log in');
                    } else if (isMatch) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } else {
                resolve(false);
            }
        });
    });
}

function addUser(username, password) {
    // Check if user already exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], function (err, results) {
        if (err) throw err;

        if (results.length > 0) {
            console.log('User already exists');
        } else {
            // User does not exist, hash the password
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) throw err;

                // Add the user to the database
                connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function (err, results) {
                    if (err) throw err;
                    console.log('User added successfully');
                });
            });
        }
    });
}

addUser('admin', 'password');

module.exports = checkCredentials;