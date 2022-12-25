const mongoose = require("mongoose");
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
    corsses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    versionKey: false,
    strict: false,
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

module.exports = mongoose.model("User", USerSchema);
