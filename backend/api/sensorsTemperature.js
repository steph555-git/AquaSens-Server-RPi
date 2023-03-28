const ds18b20 = require('ds18b20')


const sensorsTemperatureAPI = async () => {

    return new Promise((resolve, reject) => {
        ds18b20.sensors((err, ids) => {
            if (err) {
                reject("error :", err)
                return
            }
            const sensorsListTab = ids.map((sensorId, i) => {
                return {
                    id: sensorId,
                    name: "capteur " + i,
                    temperature: ds18b20.temperatureSync(sensorId)
                }
            })
            resolve(sensorsListTab)
        })
    })
}


module.exports = sensorsTemperatureAPI