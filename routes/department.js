const express =require('express')
const courseRoute = require('../routes/course')

// mergeParams allwo us to accses parmeter on anther routing        
// ex :we need access facultyId from faculty router
const router = express.Router({mergeParams:true})
const departmentControl =require('../Controllers/departmentControl')
router.get('/', departmentControl.getAllDepartments)
router.get('/:id', departmentControl.getDepartment)
router.post('/', departmentControl.createDepartment)
router.put('/:id', departmentControl.modifyDepartment)
router.delete('/:id', departmentControl.deleteDepartment)
router.use('/:departmentId/courses', courseRoute)



module.exports=router