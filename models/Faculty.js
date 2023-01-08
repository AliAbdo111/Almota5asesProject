//#region 
const mongoose = require("mongoose");
const facultySchema = mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: true,
      trim: true,
    },
    versionKey: false,
    strict: false,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Faculty", facultySchema);
//#endregion