const mongoose = require('mongoose'); //creating columns
const UserModel = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    roles: Array 
})

mongoose.model('User', UserModel)//tablename + schema (column)

module.exports = mongoose.model('User');