//require dependencies
const express = require('express');
const multer = require('multer');
const path = require('path');

//import controllers
const { createCourse, getCourses, getCourse, deleteCourse, updateCourse, getMaterials, uploadMaterial, deleteMaterial } = require('../controllers/courseController');

const router = express.Router();

//middleware to protect routes
const requireAuth = require('../middleware/requireAuth');

// Configure multer for PDF file uploads only, with custom filename
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = file.originalname.split(ext)[0]; // Use the original name without extension

        // Save the file with the original name plus the correct extension
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype;

        // Only allow .pdf files with application/pdf MIME type
        if (fileExt === '.pdf' && mimeType === 'application/pdf') {
            cb(null, true); // Accept file
        } else {
            cb(new Error('Only PDF files are allowed')); // Reject file
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Optional file size limit (5 MB)
    }
});



router.use(requireAuth);

// GET all courses
router.get('/', getCourses);

// GET a course
router.get('/:id', getCourse);

// POST(create) a course
router.post('/', createCourse);

// DELETE a course
router.delete('/:id', deleteCourse);

// PATCH(update) a course
router.patch('/:id', updateCourse);

// GET all materials for a course
router.get('/:courseId/materials', getMaterials);

// POST a material for a course (with file upload)
router.post('/:courseId/materials', upload.single('material'), uploadMaterial);

router.delete('/:courseId/materials/:materialId', deleteMaterial);

module.exports = router;
