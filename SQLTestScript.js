// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // RDS endpoint
  user: process.env.DB_USER,       // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME,   // Database name
  port: 3306,                     // Default MySQL port
});

// Test the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Endpoint to retrieve data
app.get('/api/get-data', (req, res) => {
  const query = 'SELECT * FROM your_table';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Endpoint to save data
app.post('/api/save-data', (req, res) => {
  const { data } = req.body;

  // Validate the request body
  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  const query = 'INSERT INTO your_table (column_name) VALUES (?)';
  connection.query(query, [data], (err, results) => {
    if (err) {
      console.error('Failed to save data:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ message: 'Data saved successfully', id: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});