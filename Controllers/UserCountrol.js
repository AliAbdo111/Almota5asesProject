const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports= {
   AddNewUser:async(req,res)=> {
    const body=req.body
    const cryPassword = await bcrypt.hash(body.password, 10);
    const token = jwt.sign({ email: body.email }, "Aboalhassan_key");
    const user = User.create({ ...body, token: token, password: cryPassword });
    res.status(200).json(
        {
            message:"done"
        }
    )
  },
  signIn:async(req,res)=> {
        const Email=await User.findOne({email:req.body.email}) 
      if(Email){
          res.status(200).json({message:"the user login"})
    }else{
        res.status(404).json({message:"thee user nost found"})
      }},
      getUserById:async(req,res)=>{
        const _id=req.params.id
    const user=await User.findById(_id)
    if(user){
        res.status(200).json({
            message:`you get user by id`,
            data:user,
        })
       
    }else{
        res.status(404).json({
            message:"the user not found "
        })
    }
      }
}
// module.exports = UserCountrol;
