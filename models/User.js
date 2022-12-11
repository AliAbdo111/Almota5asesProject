const mongoose = require("mongoose");
const USerSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  userType:{
    type:String,
    enum:['admin' ,'subadmin', 'student' ,'instructor'],
    default:"student"
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  College: {
    type: String,
  },
  teams: {
    type: String,
  },
  token:{
  type:String
  },
  corsses: [
    {
      type: Object,
    },
  ],
});
USerSchema.path('email').validate(async()=>{return false},"Email already Exist")
module.exports=mongoose.model('User',USerSchema)