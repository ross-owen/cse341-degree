const express = require('express');
const router = express.Router();
const { courseValidationRules, validate } = require('../validators/courses')

const controller = require('../controllers/courses');

router.get('/', controller.list);
router.post('/', courseValidationRules(), validate, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', courseValidationRules(), validate, controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;