const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  facultyName: String,

department:[{
  departmentName: departmentName,
}],
//   Ferqa 
band:{ 
    type: String,
    enum: ["first", "second", "Third", "Fourth"],}
}
,{
    versionKey: false,
    strict: false,
},
{ timestamps: true });
module.exports = mongoose.model("Faculty", facultySchema)
