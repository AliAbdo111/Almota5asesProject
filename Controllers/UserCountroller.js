const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cloudinary =require('../configuration/cloudinary')
 const {SECRET_KEY, SALT_ROUNDES} = require('../Config');
const { profile } = require("console");
module.exports = {
  // Crud Opration User Modules
  // sign up user
  AddNewUser: async (req, res) => {
    try {
      const body = req.body; 
      const newUser = await User.isEmailuse(body.email);
      if (!newUser)
        return res.json({
          message: "this email already in use ,try sign up",
          success: false,
        });
      const cryPassword = await bcrypt.hash(body.password, 10);
      const token = jwt.sign({ email: body.email }, 'SECRET_KEY');
      const user = User.create({
        ...body,
        token: token,
        password: cryPassword,
      });
      if (user) {
        res.status(200).json({ message: "the user created" });
        
      } else {
        res.status(404).json({ message: "the user not created" });
      }
    } catch (err) {
      res.json(err);
    }
  },
  //   Sign in user
  signIn: async (req, res) => {
    try {
      const body = req.body;
      const data = await User.findOne({ email: body.email });
      if (data) {
        const VAlidPassw = await bcrypt.compare(body.password, data.password);
        if (VAlidPassw) {
          res.status(200).json({ message: "the user login", data: {token : data.token , id:data._id,userType: data.userType} });
        } else {
          res.status(401).json({ message: "invalied password" });
        }
      } else {
        res.status(404).json({ message: "the user not register" });
      }
    } catch (err) {
      res.json(`can not sign in ${err}`);
    }
  },
  // Read=>  get user By Id
  getUserById: async (req, res) => {
    const _id = req.params.id || {};
    const user = await User.findById(_id);
    if (user) {
      res.status(200).json({
        message: `you get user by id`,
        data: user,
      });
    } else {
      res.status(404).json({
        message: "the user not found ",
      });
    }
  },
  // Read=>  get all users
  getAllUsers: async (req, res) => {
    try {
      const pagSize = 10;
      const pagNumber = Number(req.params.pagNumber * 1) || 1;
      const skip = (pagNumber - 1) * pagSize;
      const data = await User.find({}).skip(skip).limit(pagSize).populate({path:"Courses",select:['title', 'descrption']});
      const numOfPage = Math.ceil((await User.count()) / pagSize);
      if (data) {
        res
          .status(200)
          .json({ message: "you get ALL USERS", data:[...data] , numOfPage : numOfPage }); //error must be return Array of Data not this { ...data, numOfPage }
      } else {
        res.status(404).json({ message: "error wehen you get users" });
      }
    } catch (err) {
      res.json(err);
    }
  },
  search: async (req, res) => {
    try {
      const name = req.params.name.trimStart();
      const Users = await User.find({
        $or: [{ Name: { $regex: name } }],
      });
      if (Users.length > 1) {
        res.status(200).send({
          success: true,
          message: "You got your search results",
          data: Users,
        });
      } else {
        res.status(404).json({ message: "the user not found" });
      }
    } catch (err) {
      //  console.log(err)
      res.json(err);
    }
  },
  // deleteuser
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id || {};
      const del = await User.findByIdAndDelete(id);
      if (del) {
    if( del.cloudinary_id ) 
    {await cloudinary.uploader.destroy(del.cloudinary_id) 
     res.status(200).json({ message: "the user deleted" })
      }else{res.status(200).json({ message: "the user deleted" });
    }
      } else {
        res.status(404).json({ message: "the user not found" });
      }
    } catch (err) {
      res.json(err);
    }
  },
  // updateUserById
  update: async (req, res) => {
    try {
      const id = req.params.id || {};
      const body = req.body;
      console.log(body);
      const user = await User.findByIdAndUpdate(id, body);
      res.status(200).json("the user already update ");
    } catch (err) {
      res.status(404).json(`error wehen update user =>${err}`);
    }
  },
  //  add image to user
addImage: async (req, res) => {
  try {    const id = req.params.id || {};
    const Data=await  User.findById(id);
    const resulte = await cloudinary.uploader.upload(req.file.path,{
      folder:profile
    })
// console.log(resulte.secure_url);
    Data.image=resulte.secure_url
    Data.cloudinary_id= resulte.public_id
    const user = await User.findByIdAndUpdate(id, Data);
    res.status(200).json({message: "the user already update" ,data:user});
  } catch (err) {
    res.status(404).json(`error wehen add Image user =>${err}`);
  }
}, 
  // changePassword
  changPassword: async (req, res) => {
    try {
      const id = req.params.id;
      const user= await User.findById(id);
      // console.log(user);
      const currentPassword = req.body.currentPass;
      const password = req.body.password;

      const ValidPass = await bcrypt.compare(currentPassword, user.password);
      // console.log(ValidPass);
      if (ValidPass) {
        user.password = await bcrypt.hash(password, 10);
      const dataUser = await User.findByIdAndUpdate(id,user);
      await user.save();
      res.status(200).json(" password update");
      } else {
        res.status(401).json("the password incorrect");}
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  //  GET all student
  getUserByType: async (req, res) => {
    try {
      const type = req.params.type;
      const userData = await User.find({ userType: type });
      res.status(200).json(userData);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
  // add course to user
  addCourse: async (req, res) => {
    try {
      const data = req.body.courses;
      const id=req.params.id;
      const userData = await User.findOneAndUpdate(
        { _id: id }, 
        { $push: { Courses: data  } })
      res.status(200).json(userData);
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
// watach videos and check done of all course
  watchCourse: async (req, res) => {
    try {
      const courseid = req.params.courseid;
      const id=req.params.id;
      const index=parseInt(req.params.index)
      const userData = await User.findById(id);
      let courseIndex=userData.Courses.findIndex((item)=>item._id==courseid);
      if(courseIndex>0)
      {
      userData.Courses[courseIndex].veidos[index]={...userData.Courses[courseIndex].veidos[index],done:true}
      userData.save();
      res.status(200).json(userData);
      }
      else
      {
        throw 'can not find this course student courses list'
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  },
};
