//#region 
const Research = require("../models/Research");
module.exports = {
    add: async (req, res) => {
    try {
  
      const body = req.body;
      const research = await Research.create(body);
      if (!research) {
        return res.status(400).json({
          message: "research not created",
        });
      } else {
        return res.status(201).json({
          message: "research created",
        });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  update: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const research = await Research.findByIdAndUpdate(_id, body);
      if (!research) {
        return res.status(400).json({ message: "research not updated" });
      } else {
        res.status(200).json({ message: "research updated" });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  delete: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const research = await Research.findByIdAndRemove(_id);
      if (!research) {
        res.status(400).json({ message: "research not deleted" });
      } else {
        res.status(200).json({ message: "research deleted" });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  getAll: async (req, res) => {
    try {
    //   const body = req.body;
      console.log("kkkkk");
      const research = await Research.find({})
      .populate({ path: "publisher", select:["email" ,"Name" ,"address"]})
      if (!research) {
        res.status(400).json({ message: "research not found" });
      } else {
        res.status(200).json({ message: "research found", data: research });
      }
    } catch (e) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  getOne: async (req, res) => {
    try {
      const body = req.body;
      const _id = req.params.id;
      const research = await Research.findById(_id)
       .populate({ path: "publisher", select:["email" ,"Name" ,"address"]})
      
      if (!research) {
        res.status(400).json({ message: "research not found" });
      } else {
        res.status(200).json({ message: "research found", data: research });
      }
    } catch (e) { 
      res.status(500).json({ message: "Something went wrong!" });
    }
  },
};
//#endregion