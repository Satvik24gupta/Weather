const express = require('express')
const { getHistory, postHistory } = require('../controllers/history.controller')
const router = express.Router()

router.get('/', getHistory)

router.post('/', postHistory)

module.exports = router