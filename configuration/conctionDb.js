// Connecting to the database
const {MONGO_URI}= require('../Config');
const mongoose = require("mongoose"); 
const url =MONGO_URI
mongoose.set('strictQuery', true);

const connect = async function() {
    await mongoose.connect(url);
    console.log("You are connected to your database");
}


module.exports = connect;