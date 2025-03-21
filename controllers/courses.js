const mongo = require('../data/index');
const {ObjectId} = require("mongodb");

const list = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'List Courses'
    // #swagger.description = 'List all the courses in the database'
    // #swaager.end
    const result = await mongo.get().db().collection('courses').find();
    result.toArray().then((courses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    });
};

const create = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Create Course'
    // #swagger.description = 'Create a new course and add it to the database'
    // #swaager.end
    const course = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const result = await mongo.get().db().collection('courses').insertOne(course);
    res.setHeader('Content-Type', 'application/json');
    if (result.acknowledged) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json("Something went wrong");
    }
}

const getById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Find Course'
    // #swagger.description = 'Find a course by the given identifier'
    // #swagger.responses[200] = { description: 'Successful retrieval' }
    // #swagger.responses[404] = { description: 'Resource not found' }
    // #swaager.end
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Invalid ID");
    }
    const courseId = new ObjectId(req.params.id);
    const result = await mongo.get().db().collection('courses').findOne({ _id: courseId });
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).send();
    }
};

const updateById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Update Course'
    // #swagger.description = 'Update the course data for a specific course (by identifier)'
    // #swagger.responses[204] = { description: 'Successfully updated' }
    // #swagger.responses[404] = { description: 'Resource not found' }
    // #swaager.end
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({msg: "Invalid ID"});
    }
    const courseId = new ObjectId(req.params.id);
    const course = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const result = await mongo.get().db().collection('courses').replaceOne({ _id: courseId }, course);
    if (result.acknowledged) {
        if (result.modifiedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(500).send();
    }
}

const deleteById = async (req, res) => {
    // #swagger.tags = ['Courses']
    // #swagger.summary = 'Delete Course'
    // #swagger.description = 'Remove a course from the database (by identifier)'
    // #swaager.end
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Invalid ID");
    }
    const courseId = new ObjectId(req.params.id);
    const result = await mongo.get().db().collection('courses').deleteOne({ _id: courseId });
    console.log(result);
    if (result.acknowledged) {
        if (result.deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(500).send();
    }
}

module.exports = {
    create, list, getById, updateById, deleteById
};