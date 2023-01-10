//#region 
const Course = require("../models/Course");
class CourseService{
    static async createCourse(data)
    {
        try
        {
            const course=await Course.create(data);
            return course;
        }catch(err)
        {
            console.log(`can not create course. ${err}`)
        }
    }
    static async getAllCourses(limit, skip){
        try {
        
            const allCourses = await  Course.find()
            .populate({path:"department", select:"departmentName"})
            .populate({path:"instructor", select:["Name","image"]}).skip(skip).limit(limit)
            const numberOfPages = await Course.find().count()
            console.log(allCourses);
            return {allCourses: allCourses , numberOfPages:numberOfPages};
        } catch (error) {
            console.log(`Could not fetch Courses ${error}`)
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
    static async getCoursebyId(courseId){
        try {
            const response =  await Course.findById({_id:courseId})
            .populate({path:"department", select:"departmentName"})
            .populate({path:"instructor", select:["Name","image"]})
            return response;
        } catch (error) {
            console.log(`Course not found. ${error}`)
        }
    
    }
     static async getCourses(filter){
        try {
        //    console.log(filter);
            const response =  await Course.find(filter)
            .populate({path:"department", select:"departmentName"})
            .populate({path:"instructor", select:["Name","image"]})
            // console.log(response);
            return response;
        } catch (error) {
            console.log(`Course not found. ${error}`)
        }
    
    }
    static async getCourseByType(filter){
        try {
    
            const response =  await Course.find(filter)
            .populate({path:"department", select:"departmentName"})
            .populate({path:"instructor", select:["Name","image"]})
          
            return response;
        } catch (error) {
            console.log(`Course not found. ${error}`)
        }
    
    }
    static async addComment(id,data)
    {
        try{
       const response= await Course.findOneAndUpdate(
            { _id: id }, 
            { $push: { commentes: data  } })
            return response;
        } catch (error) {
            console.log(`Course not found. ${error}`)
        }
    }
    static async searchCourses(key){
        try {
            console.log("test");
            const Response = await Course.find({$or:[
            {'instructor.Name':{$regex:key}},
              {title:{$regex:key}},
    
    
            ]}).populate("instructor").exec();
            console.log(Response);
            return Response;
        } catch (error) {
            console.log(`Could not exsits this  Course ${error}`);
        }
    
    }

}

module.exports=CourseService;
//#endregion