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
    const id = req.body['pollID'];
    const title = req.body['pollTitle'];
    const responses = req.body['pollResponses'];
    
    console.log(id);
    console.log(title);
    for (const response in responses) {
        console.log(responses[response]);
    }

    db.run('INSERT INTO polls (id, title, owner) VALUES (?, ?, ?)', [id, title, 1], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        }
    });
    for (const response in responses) {
        db.run('INSERT INTO responses (poll_id, response, count) VALUES (?, ?, ?)', [id, responses[response], 0], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            }
        });
    };
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
