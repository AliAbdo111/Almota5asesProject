const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  facultyName: {
    type:String,
      required:true, 
      trim: true,
     
    },

// departments:[{
//   departmentName: mongoose.Schema.Types.ObjectId,
//   ref:"Department"
// }],
//   Ferqa 
// band:{ 
//     type: String,
//     enum: ["first", "second", "Third", "Fourth"],}
// }
// ,{
    versionKey: false,
    strict: false,
},
{ timestamps: true });
module.exports = mongoose.model("Faculty", facultySchema)
