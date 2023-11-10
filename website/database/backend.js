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
    databaseInfo = {};
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            console.log(rows);
            databaseInfo['users'] = rows;
        }
    });
    db.all('SELECT * FROM polls', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            console.log(rows);
            databaseInfo['polls'] = rows;
        }
    });
    db.all('SELECT * FROM responses', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            console.log(rows);
            databaseInfo['responses'] = rows;
        }
    });
    for (var key in databaseInfo) {
        console.log(key);
        console.log(databaseInfo[key]);
    }
    res.send(databaseInfo);
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

app.post('/newPoll', (req, res) => {
    const pollData = {
        title: 'Favorite Color Poll',
        responses: ['Red', 'Green', 'Blue']
    };
    
    const { title, responses } = pollData;
    
    for (const response of responses) {
        console.log(title);
        console.log(response);
    }
    // const { title, responses } = req.body;
    db.run('INSERT INTO polls (title, responses) VALUES (?, ?)', [title, responses], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send('Poll added successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
