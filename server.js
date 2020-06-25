const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// Connect to DB
connectDB();

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// BODY PARSER
// app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`.cyan.inverse));
