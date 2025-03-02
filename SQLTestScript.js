require('dotenv').config({ path: '/home/ec2-user/EmberEVDBAPI/.env' });

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 22;

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

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
