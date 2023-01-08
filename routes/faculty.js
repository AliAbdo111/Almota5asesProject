//#region 
const express=require('express');
const router= express.Router();
const facultyCountrol=require('../Controllers/facultyControl')
const departmentRoute=require('../routes/department')
router.get('/', facultyCountrol.getAllFaculty)
router.post('/', facultyCountrol.createFaculty)
router.put('/:id',facultyCountrol.updateFaculty)
router.delete('/:id',facultyCountrol.deleteFaculty)
router.get('/:id',facultyCountrol.getFaculty)
router.use('/:facultyId/deprtments', departmentRoute)

module.exports=router
//#endregion