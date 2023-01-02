const express =require('express')
const router = express.Router()
const departmentControl =require('../Controllers/departmentControl')
router.get('/', departmentControl.getAllDepartments)
router.get('/:id', departmentControl.getDepartment)
router.post('/', departmentControl.createDepartment)
router.put('/:id', departmentControl.modifyDepartment)
router.delete('/:id', departmentControl.deleteDepartment)



module.exports=router