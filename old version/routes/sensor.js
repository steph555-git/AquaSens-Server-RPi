const express = require('express')
const router = express.Router()

const sensorCtrl = require('../ctrl/sensor')

router.use(express.json())


//Route vers la fonction de recuperatrion des capteurs
router.route("/")
    .get(sensorCtrl.getSensors)



module.exports = router