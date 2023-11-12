const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3001;

// Connect to the database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(express.json());
app.use(cors());

// Define API endpoints for database operations
app.get('/', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.json(rows);
        }
    });
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send('User added successfully');
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        }
        
        if (row) {
            console.log(row);
            res.send(row);
        } else {
            res.send(row);
        }
    });
});    

// trying something CZ
// Modify the /polls endpoint to accept a code parameter
app.get('/polls/:code', (req, res) => {
    const code = req.params.code;
    
    db.all('SELECT * FROM polls WHERE code = ?', [code], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
