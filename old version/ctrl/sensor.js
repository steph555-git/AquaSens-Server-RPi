// Import de la fonction GetSensor
const getSensorsList = require('../js/callSensors')


exports.getSensors = (req, res) => {
    (async () => {
        //date format DD/MM/YY
        //formatDate(new Date())
        const resp = await getSensorsList()
        console.log("Sensors List :: ", resp);
        res.send(resp)
    })()

}