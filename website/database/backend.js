const express = require('express');
const sqlite3 = require('sqlite3');

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

// app.post('/users', (req, res) => {
//     const { name, email } = req.body;
//     db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal server error');
//         } else {
//             res.send('User added successfully');
//         }
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
