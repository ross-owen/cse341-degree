const express = require('express');
const router = express.Router();
const {courseCreateValidationRules, courseUpdateValidationRules, validate} = require('../validators/validator')

const controller = require('../controllers/courses');

const {isAuthenticated} = require('../middlewares/authentication');

router.get('/', isAuthenticated, controller.list);
router.post('/', isAuthenticated, courseCreateValidationRules(), validate, controller.create);
router.get('/:id', isAuthenticated, controller.getById);
router.put('/:id', isAuthenticated, courseUpdateValidationRules(), validate, controller.updateById);
router.delete('/:id', isAuthenticated, controller.deleteById);

module.exports = router;