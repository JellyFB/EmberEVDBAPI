require('dotenv').config({ path: '/home/ec2-user/EmberEVDBAPI/process.env' });

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

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

// Retrieve data (GET)
app.get('/api/get-data', (req, res) => {
  const query = 'SELECT * FROM your_table'; // Replace with your table name
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results); // Send the results as JSON
  });
});

// Input data (POST)
app.post('/api/save-data', (req, res) => {
  const { name, email } = req.body; // Extract data from the request body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const query = 'INSERT INTO your_table (name, email) VALUES (?, ?)'; // Replace with your table and columns
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Failed to save data:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ message: 'Data saved successfully', id: results.insertId });
  });
});

// Update data (PUT)
app.put('/api/update-data/:id', (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  const { name, email } = req.body; // Extract data from the request body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const query = 'UPDATE your_table SET name = ?, email = ? WHERE id = ?'; // Replace with your table and columns
  connection.query(query, [name, email, id], (err, results) => {
    if (err) {
      console.error('Failed to update data:', err);
      return res.status(500).json({ error: 'Failed to update data' });
    }
    res.json({ message: 'Data updated successfully' });
  });
});

// Delete data (DELETE)
app.delete('/api/delete-data/:id', (req, res) => {
  const { id } = req.params; // Extract the ID from the URL

  const query = 'DELETE FROM your_table WHERE id = ?'; // Replace with your table and columns
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Failed to delete data:', err);
      return res.status(500).json({ error: 'Failed to delete data' });
    }
    res.json({ message: 'Data deleted successfully' });
  });
});
// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://44.200.65.224:${port}`);
});
