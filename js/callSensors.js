const ds18b20 = require('ds18b20')
const getTemperature = require('./getTemperature')


function getSensorsList() {
    return new Promise((resolve, reject) => {
        ds18b20.sensors((err, ids) => {
            if (err) {
                reject("getSensorsList() , err ::", err);
                return;
            }
            const sensorsListTab = ids.map((id, i) => {
                return {
                    id: id,
                    date: formatDate(new Date()),
                    name: "capteur " + i,
                    description: "Capteur temperature //bassin/exterieur/serre",
                    temperature: getTemperature(id),
                }
            })
            resolve(sensorsListTab)
        })
    })
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



(async () => {
    //date format DD/MM/YY
    formatDate(new Date())
    const res = await getSensorsList()
    console.log("res :: ", res);
})()

module.exports = getSensorsList
