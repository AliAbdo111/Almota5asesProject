const { ifError } = require("assert");
const path = require("path");
const Department = require("../models/Department");
module.exports = {
    getAllDepartments:async(req, res)=>
    {
      try{
  let departments = await Department.find({})
  .populate({path:'faculty', select:'facultyName'})
  if(!departments){
    res.status(404).json({message:"No departments found"})
  }
  return res.status(200).json({message:"you get all department", data:departments});      
      }catch(e){
        // console.log(e);
 res.status(404).json({message:"No departments found"})
 
      }
    },
  createDepartment: async (req, res) => {
    try {
      const department = await Department.create(req.body);
      res.status(201).json(department);
    } catch (e) {
      res.status(500).send({ message: "Server Error Whene creat department" });
    }
  },
  modifyDepartment: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const department = await Department.updateOne({id:id}, body);
    if (!department) {
      res.status(404).json;
    }else{
      res.status(200).json({message:'data updated', data :department});


    }
    },
  getDepartment:async(req, res) => {
    try{
      const department = await Department.findOne({_id: req.params.id})
      .populate({path:'faculty', select:'facultyName'})
      if(!department){
        res.status(404).json('the department does not exist');
      }else{
     res.status(200).json({message:"you get department by id", data:department});
      }
      
    }catch(err){
      console.log(err);
      res.status(500).json('error when get Department');

    }
     },
  deleteDepartment:async(req, res) => {
    try{
      console.log(req);
   const department =await Department.deleteOne({_id: req.params.id});
      if(!department){
        res.status(404).json('error when delete department')
      }else{
        res.status(200).json({message:"the department deleted" ,data:department})
      }
    }catch(e){
  res.status(500).json(e)
    }
       },

};
