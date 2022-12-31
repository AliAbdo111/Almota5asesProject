const express = require('express')
const router = express.Router();

const CourseControl = require('../Controllers/CourseControl');

router.get('/', CourseControl.apiGetAllCoursess);
router.post('/', CourseControl.apiCreateCourse);
router.patch('/:id', CourseControl.apiUpdateCourse);
router.delete('/:id', CourseControl.apiDeleteCourse);





module.exports = router;
