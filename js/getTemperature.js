const ds18b20 = require('ds18b20');


function getTemperature(idSensor) {

    temp = ds18b20.temperatureSync(idSensor)
    return temp
}

module.exports = getTemperature


