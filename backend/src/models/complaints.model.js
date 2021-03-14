const mongoose = require('mongoose'); //creating columns
const ComplaintsModel = new mongoose.Schema({
    status: String,
    title: String,
    description: String,
    userId: String 
})

mongoose.model('Complaints', ComplaintsModel)//tablename + schema (column)

module.exports = mongoose.model('Complaints');