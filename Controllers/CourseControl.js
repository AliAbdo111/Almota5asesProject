const CourseService=require('../Services/CourseService')
module.exports = class Course{
    static async apiGetAllCoursess(req, res, next){
        try {
          const courses = await CourseService.getAllCourses();
          if(!courses){
             res.status(404).json("There are no courses published yet!")
          }
          res.json(courses);
        } catch (error) {
           res.status(500).json({error: error})
        }
    }
    static async apiGetCourseById(req, res, next){
        try {
           let id = req.params.id || {};
           const course = await CourseService.getCoursebyId(id);
           res.json(course);
        } catch (error) {
           res.status(500).json({error: error})
        }
     }
     static async apiCreateCourse(req, res, next){
        try {
           const createdCourse =  await CourseService.createCourse(req.body);
           res.json(createdCourse);
        } catch (error) {
           res.status(500).json({error: error});
        }
     }
  
     static async apiUpdateCourse(req, res, next){
        try {
          
           const updatedCourse = await CourseService.updateCourse(req.body);
  
           if(updatedCourse.modifiedCount === 0){
              throw new Error("Unable to update course");
           }
  
           res.json(updatedCourse);
  
        } catch (error) {
           res.status(500).json({error: error});
        }
     }
     static async apiDeleteCourse(req, res, next){
        try {
           const courseId = req.params.id;
           const deleteResponse =  await CourseService.deleteCourse(courseId)
           res.json(deleteResponse);
        } catch (error) {
           res.status(500).json({error: error})
        }
  }
}