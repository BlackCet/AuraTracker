const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// Get all courses
const getCourses = async (req, res) => {
    const user_id = req.user._id;

    try {
        const courses = await Course.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single course
const getCourse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid course id" });
    }
    const course = await Course.findById(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
};

// Create a new course
const createCourse = async (req, res) => {
    const { name, units, creditScore } = req.body;
    try {
        const user_id = req.user._id;
        const course = await Course.create({ name, units, creditScore, user_id });
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid course id" });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
};

// Update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    // console.log("Received PATCH request for course ID:", id); // Debug line
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // console.log("Invalid course ID:", id); // Debug line
        return res.status(404).json({ message: "Invalid course id" });
    }

    try {
        // console.log("Updating course with data:", req.body); // Debug line
        const course = await Course.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        
        if (!course) {
            // console.log("Course not found for ID:", id); // Debug line
            return res.status(404).json({ message: "Course not found" });
        }
        
        // console.log("Course updated:", course); // Debug line
        res.status(200).json(course);
    } catch (err) {
        // console.log("Error updating course:", err); // Debug line
        res.status(400).json({ message: err.message });
    }
};


// Fetch all materials for a course
const getMaterials = async (req, res) => {
    const { courseId } = req.params; // Only the courseId is needed
    console.log("Fetching materials for course ID:", courseId); // Debug line

    try {
        // Find the course by courseId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Return the list of materials for the course
        res.json(course.materials.map(material => ({
            ...material.toObject(),
            filePath: `${req.protocol}://${req.get('host')}/${material.filePath.replace('\\', '/')}`
        })));
        
    } catch (err) {
        res.status(500).json({ message: 'Error fetching materials', error: err.message });
    }
};


const uploadMaterial = async (req, res) => {
    const { courseId } = req.params; 
    const { title, description } = req.body;
  
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    console.log(req.file);  // Log the file to verify its content
  
    const filePath = req.file.path;
    const newMaterial = { title, description, filePath };
  
    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        { $push: { materials: newMaterial } },
        { new: true }
      );
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json(course.materials); // Return the updated list of materials
    } catch (err) {
      res.status(500).json({ message: 'Error uploading material', error: err.message });
    }
  };
  



module.exports = { createCourse, getCourses, getCourse, deleteCourse, updateCourse, getMaterials, uploadMaterial };
