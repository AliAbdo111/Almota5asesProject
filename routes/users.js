var express = require("express");
var router = express.Router();
const User = require("../models/User");
const UserCountrol=require('../Controllers/UserCountrol')
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*singup users listing*/
router.post("/signup",  UserCountrol.AddNewUser)
/*sign in uersr*/ 
router.post('/signIn' ,UserCountrol.signIn)
/*get User By Id*/
router.get('/getUserById/:id',UserCountrol.getUserById)
module.exports = router;
