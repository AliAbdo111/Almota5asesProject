//#region

const path = require("path");
const Department = require("../models/Department");
module.exports = {
  // get url/faculty/:facultyId/deprtments
  getAllDepartments: async (req, res) => {
    try {
      let fillter = {};
      if (req.params.facultyId) fillter = { faculty: req.params.facultyId };
      let departments = await Department.find(fillter).populate({
        path: "faculty",
        select: "facultyName",
      });
      if (!departments) {
        res.status(404).json({ message: "No departments found" });
      }
      return res
        .status(200)
        .json({ message: "you get all department", data: departments });
    } catch (e) {
      // console.log(e);
      res.status(500).json({ message: "No departments found" });
    }
  },
  createDepartment: async (req, res) => {
    try {
      const department = await Department.create(req.body);
      res.status(201).json("the department created");
    } catch (e) {
      res.status(500).send({ message: "Server Error Whene creat department" });
    }
  },
  modifyDepartment: async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const department = await Department.findByIdAndUpdate({ _id: id }, body);
      if (!department) {
        res.status(404).json("the department was not found");
      } else {
        res.status(200).json({ message: "data updated" });
      }
    } catch (e) {
      res.status(500).json("Server Error Whene update department");
    }
  },
  getDepartment: async (req, res) => {
    try {
      const department = await Department.findOne({
        _id: req.params.id,
      }).populate({ path: "faculty", select: "facultyName" });
      if (!department) {
        res.status(404).json("the department does not exist");
      } else {
        res
          .status(200)
          .json({ message: "you get department by id", data: department });
      }
    } catch (err) {
      res.status(500).json("Server Error Whene get department");
    }
  },
  deleteDepartment: async (req, res) => {
    try {
      // console.log(req);
      const department = await Department.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!department) {
        res.status(404).json("error when delete department");
      } else {
        res.status(200).json({ message: "the department deleted" });
      }
    } catch (e) {
      res.status(500).json("Server Error Whene delete department");
    }
  },
};
//#endregion
