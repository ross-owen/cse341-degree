const {body, validationResult} = require('express-validator')
const mongo = require('../data/index');

function validateCredits(value) {
    return value && value >= 0 && value <= 5;
}

async function findCourse(courseId) {
    if (courseId) {
        return await mongo.get().db().collection('courses')
            .findOne({courseId: courseId});
    }
    return null;
}

async function findGroup(groupId) {
    if (groupId) {
        return await mongo.get().db().collection('groups')
            .findOne({groupId: groupId});
    }
    return null;
}

const courseCreateValidationRules = () => {
    return [
        body('courseId', 'course id is required to be unique and must be alphanumeric')
            .isAlphanumeric()
            .custom(async (courseId) => {
                const group = await findCourse(courseId);
                if (group != null) {
                    throw new Error('Course already exists');
                }
                return true;
            }),
        body('name', 'name is required').notEmpty(),
        body('credits', 'number of credits is required between 0 and 5')
            .custom((value) => validateCredits(value)),
        body('preRequisites', 'favorite color is required')
            .optional()
            .isArray(),
        body('groupId', 'group is required')
            .isAlphanumeric()
            .custom(async (groupId) => {
                const group = await findGroup(groupId);
                if (group == null) {
                    throw new Error('Group does not exist');
                }
                return true;
            }),
    ]
}

const courseUpdateValidationRules = () => {
    return [
        body('name', 'name is required').notEmpty(),
        body('credits', 'number of credits is required between 0 and 5')
            .custom((value) => validateCredits(value)),
        body('preRequisites', 'favorite color is required')
            .optional()
            .isArray(),
        body('groupId', 'group is required')
            .isAlphanumeric()
            .custom(async (groupId) => {
                const group = await findGroup(groupId);
                if (group == null) {
                    throw new Error('Group does not exist');
                }
                return true;
            }),
    ]
}

const groupCreateValidationRules = () => {
    return [
        body('groupId', 'group id is required to be unique and must be alphanumeric')
            .isAlphanumeric()
            .custom(async (groupId) => {
                const group = await findGroup(groupId);
                if (group != null) {
                    throw new Error('Group already exists');
                }
                return true;
            }),
        body('name', 'name is required').notEmpty()
    ]
}

const groupUpdateValidationRules = () => {
    return [
        body('name', 'name is required').notEmpty()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.path]: err.msg}));

    return res.status(400).json({
        errors: extractedErrors,
    })
}

module.exports = {
    courseCreateValidationRules,
    courseUpdateValidationRules,
    groupCreateValidationRules,
    groupUpdateValidationRules,
    validate,
}
