const Faculty = require("../models/Faculty");
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
      const course = await Faculty.create(req.body);
      res.status(201).json(course);
    } catch (e) {
      res.status(500).send({ message: "Server Error Whene creat course" });
    }
  },
  updateFaculty: async (req, res) => {
    try {
    } catch (e) {
      res.status(500).send({ message: "something went wrong" });
    }
  },
  deleteFaculty: async (req, res) => {
    try {
      const _id = req.params.id;
      const faculty = await Faculty.deleteOne(_id);
      if (!faculty) {
        res.status(404).json("error whene you delet faculty");
      }
      res.status(200).json(faculty);
    } catch (e) {
      res.status(500).json({ message: "something went wrong" });
    }
  },
  getFaculty: async (req, res) => {
    try{
        const _id = req.params.id;
        const faculty = await Faculty.findOne({ _id });
        res.status(200).json(faculty);
        }catch(e){
            res.status(500).json({ message: "something went wrong" });
        }
  },
};
