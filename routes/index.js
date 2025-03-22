const router = require('express').Router();

router.get('/', (req, res) => {
    // #swagger.ignore = true
    res.send('hello world');
})

router.use('/courses', require('./courses'));
router.use('/groups', require('./groups'));
router.use('/api-docs', require('./api-docs'));

module.exports = router;