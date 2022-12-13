const ds18b20 = require('ds18b20');
const getTemperature = require('./getTemperature');


//function getSensorsList() {
    ds18b20.sensors((err, ids) => {
        var sensorsListTab = []

            for (var i=0; i < ids.length ; i++){
        

                var sensorsObj = new Object()
                    sensorsObj.date = Date.now()
                    sensorsObj.name = "capteur " + i
                    sensorsObj.description = ""
                    sensorsObj.id = ids[i]
                    sensorsObj.temperature = getTemperature(ids[i])

                //Add new object{sensorsObj} in array[sensorsListTab]
                sensorsListTab.push(sensorsObj)
            }

            console.log(sensorsListTab)
            return sensorsListTab

        
    })


//}


//getSensorsList()


//module.exports = getSensorsList
