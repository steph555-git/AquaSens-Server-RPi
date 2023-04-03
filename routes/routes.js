const express = require('express')
const router = express.Router()

const getDataSensorsAPI = require('../mw/getDataSensorsAPI')

router.route('/')
    .get(getDataSensorsAPI)

module.exports = router
