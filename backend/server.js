require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Routes
app.use('/api/qr', require('./routes/qrRoutes'));
app.use('/api/webhook', require('./routes/webhookRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));