require('dotenv').config({ path: '/home/ec2-user/EmberEVDBAPI/.env' });

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'emberevuserdata.c6xw66mqsqpl.us-east-1.rds.amazonaws.com',       // RDS endpoint
  user: 'admin',       // Database username
  password: 'emberEVdata', // Database password
  database: 'emberevuserdata',   // Database name
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
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
