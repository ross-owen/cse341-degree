const mongo = require('../data/index');
const {Course} = require('../models/models');

const list = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'List Courses'
    // #swagger.description = 'List all the courses in the database'
    // #swaager.end
    try {
        await mongo.get().db().collection('courses').find({}, (err, res) => {
            if (err) {
                res.status(500, 'Unable to retrieve courses').end();
            }
        }).toArray().then((found) => {
            if (found.length === 0) {
                res.status(204, 'No Content').end();
            } else {
                let courses = []
                found.forEach(course => {
                    courses.push(new Course(course.courseId,
                        course.name,
                        course.credits,
                        course.preRequisites,
                        course.groupId,
                        course.year,
                        course.semester,
                        course.term,
                        course.status));
                });
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(courses);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
};

const create = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Create Course'
    // #swagger.description = 'Create a new course and add it to the database'
    // #swaager.end
    try {
        const courseId = req.body.courseId;
        if (!courseId.match(/^[A-Z]{2,4}[0-9]{2,5}$/)) {
            res.status(400).json('Invalid Course Id. Must be in AAA111 format').send();
            return;
        }

        const course = new Course(
            courseId,
            req.body.name,
            req.body.credits,
            req.body.preRequisites,
            req.body.groupId,
            req.body.year,
            req.body.semester,
            req.body.term,
            req.body.status
        );
        const result = await mongo.get().db().collection('courses').insertOne(course);
        res.setHeader('Content-Type', 'application/json');
        if (result.acknowledged) {
            res.status(201).json(new Course(courseId,
                course.name,
                course.credits,
                course.preRequisites,
                course.groupId,
                course.year,
                course.semester,
                course.term,
                course.status));
        } else {
            res.status(500).json("Something went wrong");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

const getById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Find Course'
    // #swagger.description = 'Find a course by the given identifier'
    // #swagger.responses[200] = { description: 'Successful retrieval' }
    // #swagger.responses[404] = { description: 'Resource not found' }
    // #swaager.end
    try {
        const courseId = req.params.id;
        if (!courseId.match(/^[A-Z]{2,4}[0-9]{2,5}$/)) {
            res.status(400).json('Invalid Course Id. Must be in AAA111 format').send();
            return;
        }

        const result = await mongo.get().db().collection('courses').findOne({courseId: courseId});
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(new Course(result.courseId,
                result.name,
                result.credits,
                result.preRequisites,
                result.groupId,
                result.year,
                result.semester,
                result.term,
                result.status));
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
};

const updateById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Update Course'
    // #swagger.description = 'Update the course data for a specific course (by courseId)'
    // #swagger.responses[404] = { description: 'Entity not found' }
    // #swaager.end
    try {
        const courseId = req.params.id;
        if (!courseId.match(/^[A-Z]{2,4}[0-9]{2,5}$/)) {
            res.status(400).json('Invalid Course Id. Must be in AAA111 format').send();
            return;
        }

    const course = new Course(
        courseId,
        req.body.name,
        req.body.credits,
        req.body.preRequisites,
        req.body.groupId,
        req.body.year,
        req.body.semester,
        req.body.term,
        req.body.status

);

        const result = await mongo.get().db().collection('courses').replaceOne({courseId: course.courseId}, course);
        if (result.acknowledged) {
            if (result.modifiedCount === 1) {
                res.status(200).json(course);
            } else {
                res.status(404).send();
            }
        } else {
            res.status(500).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

const deleteById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Delete Course'
    // #swagger.description = 'Remove a course from the database (by identifier)'
    // #swaager.end
    try {
        const courseId = req.params.id;
        if (!courseId.match(/^[A-Z]{2,4}[0-9]{2,5}$/)) {
            res.status(400).json('Invalid Course Id. Must be in AAA111 format').send();
            return;
        }

        const result = await mongo.get().db().collection('courses').deleteOne({courseId: courseId});
        if (result.acknowledged) {
            if (result.deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        } else {
            res.status(500).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

module.exports = {
    create, list, getById, updateById, deleteById
};