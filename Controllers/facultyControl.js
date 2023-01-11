//#region
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
module.exports = {
  getAllFaculty: async (req, res) => {
    try {
      let data = await Faculty.find({});
      return res
        .status(200)
        .json({ message: "you get all faculty ", data: data });
    } catch {
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  createFaculty: async (req, res) => {
    try {
      const faculty = await Faculty.create(req.body);
      if (!faculty) {
        res.status(404).json({ message: "error creating" });
      } else {
        res.status(201).json("the creation successful");
      }
    } catch (e) {
      res.status(500).json({ message: "Server Error Whene creat faculty" });
    }
  },
  updateFaculty: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const faculty = await Faculty.findByIdAndUpdate(_id, body);
      if (!faculty) {
        res.status(404).json({ message: "Faculty not found" });
      } else {
        res.status(200).json("the faculty is updated");
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error Whene update faculty" });
    }
  },
  deleteFaculty: async (req, res) => {
    try {
      const _id = req.params.id;
      const facultyDelete = await Faculty.findByIdAndDelete(_id);
      const department = await Department.deleteMany({
        faculty: req.params.id,
      });

      if (!facultyDelete) {
        res.status(404).json("the Faculty not founded");
      } else {
        res.status(200).json("the Faculty already deleted");
      }
    } catch (e) {
      res.status(500).json({ message: "Server Error Whene delete faculty" });
    }
  },
  getFaculty: async (req, res) => {
    try {
      const _id = req.params.id;
      const faculty = await Faculty.findOne({ _id });
      if (!faculty) {
        res.status(404).json(" the Faculty not founded");
      } else {
        res.status(200).json(faculty);
      }
    } catch (e) {
      res.status(500).json({ message: "Server Error Whene get faculty" });
    }
  },
};
//#endregion
