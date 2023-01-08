//#region 
const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    departmentName:String,
    departmentImage:String,
    faculty:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Faculty',
    require:[true,'department must have faculty'],
    }
},
{
    versionKey: false,
    strict: false,
},
{ timestamps: true })
module.exports=mongoose.model('Department',departmentSchema);
//#endregion