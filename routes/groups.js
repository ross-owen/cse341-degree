const express = require('express');
const router = express.Router();
const { validate, groupCreateValidationRules, groupUpdateValidationRules} = require('../validators/validator')

const controller = require('../controllers/groups');

router.get('/', controller.list);
router.post('/', groupCreateValidationRules(), validate, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', groupUpdateValidationRules(), validate, controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;