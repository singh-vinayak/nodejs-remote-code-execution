const router = require('express').Router()
const status = require('../controllers/status.controller')

router.get('/:taskId', status.getStatus);

module.exports = router