const ds18b20 = require('ds18b20');


function getSensorsList() {
    ds18b20.sensors((err, ids) => {
        var sensorsListTab = []

            for (var i=0; i < ids.length ; i++){
        
                let sensorsObj = new Object
                sensorsObj.name = "capteur " + i
                sensorsObj.description = ""
                sensorsObj.idSensor = ids[i]

                //ajout du nouvel obj dans le tableau sensorsListTab
                sensorsListTab.push(sensorsObj)
            }
            console.log(sensorsListTab)
      })
}

//exports.module = getSensorsList
