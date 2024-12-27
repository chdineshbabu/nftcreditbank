import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    credits: { type: Number, required: true },
});

const Course = mongoose.models.Course ||  mongoose.model("Course" , CourseSchema)
export default Course