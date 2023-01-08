//#region
const { default: mongoose } = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    time: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    descrption: String,
    material: Array,
    veidos: Array,
    demo: String,
    cover: String,
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentes: [
      {
        comment: String,
        Poster: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    band: {
      type: String,
      enum: ["first", "second", "Third", "Fourth", "general"],
    },
    type: {
      type: String,
      enum: ["theoretical", "Practical", "Summary"],
    },
  },
  {
    versionKey: false,
    strict: false,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", courseSchema);
//#endregion
