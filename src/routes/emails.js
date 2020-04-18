const router = require('express-promise-router')();
const Email = require('../models/email');

const DURATION_CACHE = 10 //segundos

const { paginatedEmails, msg, newEmail } = require('../controllers/email');
const { paginatedResults } = require('../controllers/middleware/middlewarePagination');
const { cache } = require('../controllers/middleware/middlewareCache');
const { isJson } = require('../controllers/middleware/middlewareContType');

//router.get('/', cache(DURATION_CACHE));
router.get('/', paginatedResults(Email), paginatedEmails);
router.get('/msg', msg);
router.post('/', isJson, newEmail);


module.exports = router;