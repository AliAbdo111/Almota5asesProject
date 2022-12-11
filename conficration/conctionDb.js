// Connecting to the database
const mongoose = require("mongoose"); 
const url ="mongodb+srv://aliomran_11:aliomran_11@cluster0.acjzw0f.mongodb.net/test?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);

const connect = async function() {
    await mongoose.connect(url);
    console.log("You are connected to your database");
}


module.exports = connect;