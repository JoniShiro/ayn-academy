const asyncHandler = require('express-async-handler');

const Course = require('../models/courseModel');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public

const getCourses = asyncHandler (async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses)
})

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private

const createCourse = asyncHandler (async (req, res) => {
    if(!req.body.name) {
        res.status(400);
        throw new Error('Please enter a name');
    }

    const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
    })


    res.status(200).json(course);
})

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private

const updateCourse = asyncHandler (async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
        })

    res.status(200).json(updatedCourse);
})

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private

const deleteCourse = asyncHandler (async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    await course.deleteOne({ _id: req.params.id });

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}
