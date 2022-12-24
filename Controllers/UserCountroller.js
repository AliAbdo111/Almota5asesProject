const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const SECRET_KEY=process.env.SECRET_KEY;

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
      const token = jwt.sign({ email: body.email }, SECRET_KEY);
      const user = User.create({
        ...body,
        token: token,
        password: cryPassword,
      });
      if (user) {
        res.status(200).json({ message: " the user created" });
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
          res.status(200).json({ message: "the user login", token: data.token });
        } else {
          res.status(401).json({ message: "invalied password" });
        }
      } else {
        res.status(401).json({ message: "the user not register" });
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
      const data = await User.find({}).skip(skip).limit(pagSize);
      const numOfPage = Math.ceil((await User.count()) / pagSize);
      if (data) {
        res
          .status(200)
          .json({ message: "you get ALL USERS", data: { ...data, numOfPage } });
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
        res.status(200).json({ message: "the user deleted" });
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
      const userData = await User.findById(id);
      userData.image = req.file.path;
      const image = userData.image;
      const user = await User.findByIdAndUpdate(id, { ...body, image: image });
      res.status(200).json("the user already update ");
    } catch (err) {
      res.json(`error wehen update user =>${err}`);
    }
  },
  // changePassword
  chagPassword: async (req, res) => {
    try {
      const id = req.params.id;
      const password = req.body.password;
      const hashPassword = await bcrypt.hash(password, 12);
      const body = req.body;
      const dataUser = await User.findByIdAndUpdate(id, {
        ...body,
        password: hashPassword,
      });
      res.status(200).json(" password update");
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
  // get
};