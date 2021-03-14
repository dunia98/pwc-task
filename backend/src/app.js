const express = require('express'); // call server
const app = express();
const db = require('../config/db');//call my db 
const cors = require('cors');
app.use(cors()) // for development only

// controllers
const UserController = require('./controllers/user.controller');
app.use('/users', cors(), UserController)

const ComplaintsController = require('./controllers/complaints.controller');
app.use('/complaints', cors(), ComplaintsController)

module.exports = app;