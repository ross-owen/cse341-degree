const express = require('express');
const router = express.Router();
const { contactValidationRules, validate } = require('../validators/courses')

const controller = require('../controllers/courses');

router.get('/', controller.list);
router.post('/', contactValidationRules(), validate, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', contactValidationRules(), validate, controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;