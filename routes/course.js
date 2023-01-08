const express = require('express')
const router = express.Router({mergeParams:true});
const CourseControl = require('../Controllers/CourseControl');

router.get('/', CourseControl.apiGetAllCoursess);
router.post('/', CourseControl.apiCreateCourse);
router.get('/:id', CourseControl.apiGetCourseById);
// to get all course in department 
router.get('/:type/:departmentId', CourseControl.apiGetCourses);
// get course by type
router.get('/course/byType/:type', CourseControl.apiGetCourseByType);
router.put('/:id', CourseControl.apiUpdateCourse);
router.delete('/:id', CourseControl.apiDeleteCourse);
router.patch('/addcomment/:id', CourseControl.apiAddCommentCourses);





module.exports = router;
