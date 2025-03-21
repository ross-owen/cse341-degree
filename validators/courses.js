const { body, validationResult } = require('express-validator')
const courseValidationRules = () => {
    return [
        body('firstName', 'first name is required').not().isEmpty(),
        body('lastName', 'last name is required').not().isEmpty(),
        body('email', 'email is required').not().isEmpty(),
        body('email', 'invalid email').isEmail(),
        body('favoriteColor', 'favorite color is required').not().isEmpty(),
        body('birthday', 'birthday needs to be in a date format. ex: yyyy-mm-dd').isISO8601(),
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
    courseValidationRules,
    validate,
}
