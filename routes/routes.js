const express = require('express')
const router = express.Router()

const getDataSensorsAPI = require('../mw/getDataSensorsAPI')

router.route('/')
    .get(getDataSensorsAPI)

module.exports = router
    //.get((req, res, next) => {
    //    return new Promise((resolve, reject) => {
    //        ds18b20.sensors((err, ids) => {
    //            if (err) {
    //                reject("getSensorsList() , err ::", err);
    //                return;
    //            }
    //            const sensorsListTab = ids.map((id, i) => {
    //                return {
    //                    "date": formatDate(new Date()),
    //                    "id": id,
    //                    "name": "capteur " + i,
    //                    "description": "Capteur temperature bassin-exterieur-bassin",
    //                    "temperature": getTemperature(id)
    //                }
    //            })
    //            resolve(sensorsListTab)
    //        })
    //    })
    //})

