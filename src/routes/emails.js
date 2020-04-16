const router = require('express-promise-router')();
const Email = require('../models/email');
const mcache = require('memory-cache');
const DURACION_CACHE = 10 //segundos

const { paginatedEmails, msg, newEmail } = require('../controllers/email');
const { paginatedResults } = require('../controllers/middleware/middlewarePagination');
const { cache } = require('../controllers/middleware/middlewareCache');

router.get('/', cache(DURACION_CACHE, mcache));
router.get('/', paginatedResults(Email), paginatedEmails);
router.get('/msg', msg);
router.post('/', newEmail);


module.exports = router;