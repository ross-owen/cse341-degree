const express = require('express');
const router = express.Router();
const { courseCreateValidationRules, courseUpdateValidationRules, validate } = require('../validators/validator')

const controller = require('../controllers/courses');

router.get('/', controller.list);
router.post('/', courseCreateValidationRules(), validate, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', courseUpdateValidationRules(), validate, controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;