const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'your-rds-endpoint',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});

// Endpoint to retrieve data
app.get('/api/get-data', (req, res) => {
  const query = 'SELECT * FROM your_table';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Endpoint to save data
app.post('/api/save-data', (req, res) => {
  const { data } = req.body;
  const query = 'INSERT INTO your_table (column_name) VALUES (?)';
  connection.query(query, [data], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ message: 'Data saved successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});