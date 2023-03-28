const ds18b20 = require('ds18b20')

async function getSensorsList() {
    return new Promise((resolve, reject) => {
        ds18b20.sensors((err, ids) => {
            if (err) {
                reject("getSensorsList() , err :", err)
                return
            }
            const sensorsListTab = ids.map((id, i) => {
                return {
                    date: formatDate(new Date()),
                    id: id,
                    name: "capteur " + i,
                    description: "Capteur temperature bassin-exterieur-bassin",
                    temperature: getTemperature(id)

                }
            })

            resolve(sensorsListTab)
        })
    })
}
(async () => {
    const result = await getSensorsList()
    console.log(result)
})()


//printIds()

function printIds() {
    ds18b20.sensors(function (err, ids) {
        console.log(ids)
    })

}

function getTemperature(idSensor) {
    const temp = ds18b20.temperatureSync(idSensor)
    return temp
}


function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/')
}

