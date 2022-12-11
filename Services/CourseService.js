const Course = require("../models/Course");

class CourseService{
    static async createCourse(data)
    {
        try
        {
            const data=await Course.create(data);
            return data;
        }catch(err)
        {
            console.log(`can not create course. ${err}`)
        }
    }
    static async getAllCourses(){
        try {
            const allCourses = await  Course.find();
            return allCourses;
        } catch (error) {
            console.log(`Could not fetch Courses ${error}`)
        }
    }
    static async getCoursebyId(courseId){
        try {
            const response =  await Course.findById({_id: courseId});
            return response;
        } catch (error) {
            console.log(`Course not found. ${error}`)
        }
    }
    static async updateCourse(courseId,modifier){
        try {
            const updateResponse =  await Course.updateOne({_id:courseId},modifier)

                return updateResponse;
        } catch (error) {
            console.log(`Could not update Course ${error}`);

    }
}
static async deleteCourse(courseId){
    try {
        const deletedResponse = await Course.findOneAndDelete(courseId);
        return deletedResponse;
    } catch (error) {
        console.log(`Could not delete Course ${error}`);
    }

}
}

module.exports=CourseService;