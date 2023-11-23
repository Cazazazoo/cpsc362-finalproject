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

    const pollData = {id, title, responses};
    res.send(pollData);
});

app.post('/updateResponseCount', (req, res) => {
    const pollID = req.body['pollID'];
    const responseID = req.body['selectedOption'];
    
    console.log(pollID);
    console.log(responseID);


    // Update the response count for the specified response in the 'responses' table
    db.run('UPDATE responses SET count = count + 1 WHERE poll_id = ? AND id = ?', [pollID, responseID], (err) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send('Internal server error');
        }

        // res.status(200).send('Response count updated successfully');
    });

    const responseData = {pollID, responseID};
    res.send(responseData);
});

app.get('/polls', (req, res) => {
    db.all('SELECT * FROM polls', (err, rows) => {
        res.send(rows);
    });
    
});

app.get('/resp', (req, res) => {
    db.all('SELECT * FROM responses', (err, rows) => {
        res.send(rows);
    });
});

// // trying something CZ
// // Modify the /polls endpoint to accept a code parameter
// app.get('/polls/:id', (req, res) => {
//     const id = req.params.id;
    
//     db.all('SELECT * FROM polls WHERE id = ?', [code], (err, rows) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         res.send(rows);
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
