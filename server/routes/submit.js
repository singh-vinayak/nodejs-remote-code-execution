const router = require('express').Router()
const submit = require('../controllers/submit.controller')

router.post('/', submit.submitCode)

module.exports = router