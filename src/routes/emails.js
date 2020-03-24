const router = require('express-promise-router')();

const { index, msg, newEmail } = require('../controllers/email');

router.get('/', index);
router.get('/msg', msg);
router.post('/', newEmail);

module.exports = router;