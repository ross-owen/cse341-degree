const express = require('express');
const router = express.Router();
const { validate, groupCreateValidationRules, groupUpdateValidationRules} = require('../validators/validator')

const controller = require('../controllers/groups');

const {isAuthenticated} = require('../middlewares/authentication');

router.get('/', controller.list);
router.post('/', isAuthenticated, groupCreateValidationRules(), validate, controller.create);
router.get('/:id', controller.getById);
router.put('/:id', isAuthenticated, groupUpdateValidationRules(), validate, controller.updateById);
router.delete('/:id', isAuthenticated, controller.deleteById);

module.exports = router;