//#region 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const USerSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      enum: ["admin", "subadmin", "student", "instructor"],
      default: "student",
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
      default:'https://res.cloudinary.com/dqwqtvl0b/image/upload/v1672244314/function%20profile%28%29%20%7B%20%5Bnative%20code%5D%20%7D/xccxqzdakbppvc7x8bil.png'
},
cloudinary_id:{
  type:String,
},
    faculty: {
      type: String,
    },
    Certificate: {
      type: String,
    },
    band: {
      type: String,
    },
    token: {
      type: String,
    },
    Courses: Array,
    watch: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    strict: true,
  },
  { timestamps: true }
);
USerSchema.statics.isEmailuse = async function (email) {
  if (!email) throw new Error("invalid Email");
  try {
    const user = await this.findOne({ email: email });
    if (user) return false;
    return true;
  } catch (error) {
    console.log(`error inside isEmail method`, error);
  }
  
};
USerSchema.pre("updateOne", async function (next) {
const User = this.model("User");
if(User.isModified("password")) {
  User.password= await bcrypt.hash(User.password, 10);
    }

})

module.exports = mongoose.model("User", USerSchema);
//#endregion