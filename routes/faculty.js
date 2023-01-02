const express=require('express');
const router= express.Router();
const facultyCountrol=require('../Controllers/facultyControl')

router.get('/', facultyCountrol.getAllFaculty)
router.post('/', facultyCountrol.createFaculty)
router.put('/:id',facultyCountrol.updateFaculty)
router.delete('/:id',facultyCountrol.deleteFaculty)
router.get('/:id',facultyCountrol.getFaculty)


module.exports=router
