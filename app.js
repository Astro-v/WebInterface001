const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Configure express to use EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, world!' });
});

app.get('/login', (req, res) => {
    res.send('Login successful!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});