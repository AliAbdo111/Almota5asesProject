
//#region 
const { response } = require("../app");
const CourseService = require("../Services/CourseService");
module.exports = class Course {
  static async apiGetAllCoursess(req, res, next) {
    try {
      console.log("kxam");
  
  const pagNumber=Number(req.params.pagNumber *1 ) ||1;
  const limit=req.params.limit  ;
  const skip= (pagNumber -1) * limit ;
      const courses = await CourseService.getAllCourses(limit,skip);
      if (!courses) {
        res.status(404).json("There are no courses published yet!");
      } else {
        res.json({ message: "you get all courses", data: courses });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiGetCourseById(req, res, next) {
    try {
      let id = req.params.id || {};
      const course = await CourseService.getCoursebyId(id);
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiCreateCourse(req, res, next) {
    try {
      const createdCourse = await CourseService.createCourse(req.body);
      res.json(createdCourse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiUpdateCourse(req, res, next) {
    try {
      const updatedCourse = await CourseService.updateCourse(
        req.params.id,
        req.body
      );

      if (updatedCourse.modifiedCount === 0) {
        throw new Error("Unable to update course");
      }

      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiDeleteCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const deleteResponse = await CourseService.deleteCourse(courseId);
      res.json({ message: "the course Deleted", data: deleteResponse });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiGetCourses(req, res, next) {
    try {
      let type = req.params.type;
      let departmentId = req.params.departmentId;

      //   const course = await CourseService.getGetCourses({type:type,department:departmentId});
      //
      const course = await CourseService.getCourses({
        type: type,
        department: departmentId,
      });

      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  //add get
  static async apiGetCourseByType(req, res, next) {
    try {
      let type = req.params.type;
      let fucaltyId = req.params.facultyId;
      const course = await CourseService.getCourseByType({
        type: type,
        facultyId: facultyId,
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiAddCommentCourses(req, res, next) {
    try {
      let id = req.params.id;
      let data = req.body;
      const course = await CourseService.addComment(id, data);
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiSearchCourse(req, res ,next)
  {
    try {

      let title = req.params.title;
   const course= await  CourseService.searchCourses(title);
   if(!course)
   {
    res.status(404).send('no courses found')
   }else{
    res.status(200).json({message:'you get word search results' ,data:course})
   }
    } catch (error) {
      res.status(500).json({ error: error });

   }
};}
//#endregion