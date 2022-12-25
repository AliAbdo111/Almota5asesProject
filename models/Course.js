const { default: mongoose } = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    descrption: String,
    material: Array,
    veidos: Array,
    demo: String,
    users: [{ 
        type: mongoose.Schema.Types.ObjectId
             , ref: "User" 
            }],

    category: {
      type: String,
      enum: ["theoretical", "Practical", "Summary"],
    },
    subCategory: {
      type: String,
      enum: ["first", "second", "Third", "Fourth", "general"],
    },
  },
  {
    versionKey: false,
    strict: false,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", courseSchema);
