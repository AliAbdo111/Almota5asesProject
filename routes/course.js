const express = require('express')
const router = express.Router({mergeParams:true});
const CourseControl = require('../Controllers/CourseControl');

router.get('/', CourseControl.apiGetAllCoursess);
router.post('/', CourseControl.apiCreateCourse);
router.get('/:id', CourseControl.apiGetCourse);
// to get all course in department 
router.get('/:type/:departmentId', CourseControl.apiGetCourses);
router.put('/:id', CourseControl.apiUpdateCourse);
router.delete('/:id', CourseControl.apiDeleteCourse);





module.exports = router;
