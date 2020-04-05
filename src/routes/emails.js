const router = require('express-promise-router')();
const Email = require('../models/email');

const { paginatedResults, paginatedEmails, msg, newEmail } = require('../controllers/email');

router.get('/', paginatedResults(Email), paginatedEmails);
router.get('/msg', msg);
router.post('/', newEmail);

module.exports = router;