const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    departmentName:String,
    departmentImage:String,
   departmentCourses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'}]

})