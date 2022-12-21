var express = require("express");
var router = express.Router();
const User = require("../models/User");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "./puplic/images/");
  },
  filename: (req, file, cd) => {
    cd(null, new Date().toDateString() + file.originalname);
  },
});
const fileFillter = (req, file, cd) => {
  if (file.mimetype === "image/jpeg") {
    cd(null, true);
  } else {
    cd(new Error("please uplaod jpg file"), false);
  }
};
const uploade = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 10 * 5,
  },
  fileFilter: fileFillter,
});
const UserCountrol = require("../Controllers/UserCountroller");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*singup users listing*/
router.post("/signup", UserCountrol.AddNewUser);
/*sign in uersr*/
router.post("/signIn", UserCountrol.signIn);
/*get User By Id*/
// router.get('/:id',UserCountrol.getUserById)
// get all users
router.get("/all/:pagNumber", UserCountrol.getAllUsers);
// getuserByType
router.get("/user/:type", UserCountrol.getUserByType);
//delete user
router.delete("/:id", UserCountrol.deleteUser);
// search about user
router.get("/search/:name", UserCountrol.search);
// update in user data
router.put("/:id", uploade.single("image"), UserCountrol.update);
// Change PAssword
router.put("/changePasss/:id", UserCountrol.chagPassword);
module.exports = router;
