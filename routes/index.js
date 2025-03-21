const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('hello world');
})

router.use('/courses', require('./courses'));
router.use('/api-docs', require('./api-docs'));

module.exports = router;