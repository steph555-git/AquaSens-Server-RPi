

/* script pour l'affichage de la meteo*/
fetch("http://api.weatherapi.com/v1/forecast.json?key=65c149d30c2849fa982140042230801&q=32.0618402,35.0531672&lang=fr&days=5")
    .then((resp) => {
        resp.json()
            .then((data) => {
                console.log(data)
                villeMeteo = document.getElementById('villeMeteo')
                heureMeteo = document.getElementById('heureMeteo')
                tempMeteo = document.getElementById('tempMeteo')
                tempMin = document.getElementById('tempMin')
                tempMax = document.getElementById('tempMax')
                condMeteo = document.getElementById('condMeteo')
                humidity = document.getElementById('humidity')
                wind = document.getElementById('wind')
                atm = document.getElementById('atm')
                imageMeteo = document.getElementById('imageMeteo')
                date1 = document.getElementById('date1')
                date2 = document.getElementById('date2')
                date3 = document.getElementById('date3')
                date4 = document.getElementById('date4')
                detailsMeteo1 = document.getElementById('detailsMeteo1')
                detailsMeteo2 = document.getElementById('detailsMeteo2')
                detailsMeteo3 = document.getElementById('detailsMeteo3')
                detailsMeteo4 = document.getElementById('detailsMeteo4')
                imageForcast1 = document.getElementById('imageForcast1')
                imageForcast2 = document.getElementById('imageForcast2')
                imageForcast3 = document.getElementById('imageForcast3')
                imageForcast4 = document.getElementById('imageForcast4')

                villeMeteo.textContent = data.location.name
                heureMeteo.textContent = data.location.localtime
                tempMeteo.innerHTML = data.current.temp_c + "&#176;"
                condMeteo.textContent = data.current.condition.text
                imageMeteo.src = data.current.condition.icon
                humidity.textContent = "Humidité : " + data.current.humidity + " %"
                wind.textContent = "Vent : " + data.current.wind_kph + " km/h"
                atm.textContent = "Pression : " + data.current.pressure_mb + " hPa"

                //PREVISION
                date1.innerHTML = '<span style="font-weight:400;font-size: 16px;">' + data.forecast.forecastday[1].date + '</span>'
                date2.innerHTML = '<span style="font-weight:400;font-size: 16px;">' + data.forecast.forecastday[2].date + '</span>'
                date3.innerHTML = '<span style="font-weight:400;font-size: 16px;">' + data.forecast.forecastday[3].date + '</span>'
                date4.innerHTML = '<span style="font-weight:400;font-size: 16px;">' + data.forecast.forecastday[4].date + '</span>'

                detailsMeteo1.innerHTML = data.forecast.forecastday[1].day.condition.text + "<br>Temp min: " + data.forecast.forecastday[1].day.mintemp_c + "&#176;C<br>Temp max : " + data.forecast.forecastday[1].day.maxtemp_c + "&#176;C"
                detailsMeteo2.innerHTML = data.forecast.forecastday[2].day.condition.text + "<br>Temp min: " + data.forecast.forecastday[2].day.mintemp_c + "&#176;C<br>Temp max : " + data.forecast.forecastday[2].day.maxtemp_c + "&#176;C"
                detailsMeteo3.innerHTML = data.forecast.forecastday[3].day.condition.text + "<br>Temp min: " + data.forecast.forecastday[3].day.mintemp_c + "&#176;C<br>Temp max : " + data.forecast.forecastday[3].day.maxtemp_c + "&#176;C"
                detailsMeteo4.innerHTML = data.forecast.forecastday[4].day.condition.text + "<br>Temp min: " + data.forecast.forecastday[4].day.mintemp_c + "&#176;C<br>Temp max : " + data.forecast.forecastday[4].day.maxtemp_c + "&#176;C"

                imageForcast1.src = data.forecast.forecastday[1].day.condition.icon
                imageForcast2.src = data.forecast.forecastday[2].day.condition.icon
                imageForcast3.src = data.forecast.forecastday[3].day.condition.icon
                imageForcast4.src = data.forecast.forecastday[4].day.condition.icon
            })
    })