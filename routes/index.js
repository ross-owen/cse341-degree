const passport = require("passport");
const router = require('express').Router();


router.get('/', (req, res) => {
    // #swagger.ignore = true
    res.send(req.session.user !== undefined
        ? `Logged in as ${req.session.user.displayName}`
        : 'Logged out');
});

router.use('/courses', require('./courses'));
router.use('/groups', require('./groups'));
router.use('/api-docs', require('./api-docs'));
router.use('/auth', require('./auth'));

module.exports = router;