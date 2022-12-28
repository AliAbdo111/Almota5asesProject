var express = require("express");
var router = express.Router();
const User = require("../models/User");
const UserCountrol = require("../Controllers/UserCountroller");
const path = require("path");
const multer = require("multer");
const authorization = require("../Middlewares/authentication");
const  {storage ,limits ,fileFillter}= require('../Services/multer')
const uploade = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFillter,
});
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/*singup users listing*/
router.post("/signup", UserCountrol.AddNewUser);
/*sign in uersr*/
router.post("/signIn", UserCountrol.signIn);
/*get User By Id*/
router.get('/ById/:id',UserCountrol.getUserById)
// get all users
router.get("/all/:pagNumber", UserCountrol.getAllUsers);
// getuserByType
router.get("/ByType/:type", UserCountrol.getUserByType);
//delete user
router.delete("/:id", authorization, UserCountrol.deleteUser);
// search about user
router.get("/search/:name", UserCountrol.search);
// update in user data
router.put("/:id", UserCountrol.update);
// add Image
router.put("/addImage/:id" ,uploade.single('image'), UserCountrol.addImage);

// Change PAssword"
router.put("/changePasss/:id", UserCountrol.changPassword);
module.exports = router;
