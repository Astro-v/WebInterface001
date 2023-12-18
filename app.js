const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Configure express to use public folder
app.use(express.static('public'));

// Configure express to use EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/root', (req, res) => {
    res.send('Login successful!');
});

app.get('/login', (req, res) => {
    console.log('This is a message for the logs.');
    res.render('index');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);
    // Check if the login is valid
    if (username === 'admin' && password === 'password') {
        // If it is, redirect to the root page
        res.redirect('/root');
    } else {
        // If it isn't, redirect back to the login page
        res.redirect('/login');
    }
});

const fs = require('fs');
const path = require('path');

// Route pour afficher les répertoires
app.get('/directories*', (req, res) => {
    const dirs = req.params[0].split('/');
    console.log(req.params[0]);
    const dirPath = path.join('./data', ...dirs);
    // Si dirPath est un dossier
    if (fs.lstatSync(dirPath).isDirectory()) {
        fs.readdir(dirPath, (err, directories) => {
            if (err) {
                console.error("Could not list the directory.", err);
                res.status(500).send('An error occurred');
            } else {
                res.render('directories', { directories, curent_path: req.params[0] });
            }
        });
    } else {
        // Si dirPath est un fichier
        fs.readFile(dirPath, 'utf8', (err, data) => {
            if (err) {
                console.error("Could not read the file.", err);
                res.status(500).send('An error occurred');
            } else {
                res.render('file', { data, curent_path: req.params[0] });
            }
        });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
