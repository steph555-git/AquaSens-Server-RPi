
const urlWeatherAPI = `http://api.weatherapi.com/v1/forecast.json?key=19d2956476524ba387d91946231002&q=32.0618402,35.0531672&lang=en&days=3`

fetch(urlWeatherAPI)
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

        detailsMeteo1 = document.getElementById('detailsMeteo1')
        detailsMeteo2 = document.getElementById('detailsMeteo2')
        detailsMeteo3 = document.getElementById('detailsMeteo3')

        imageForcast1 = document.getElementById('imageForcast1')
        imageForcast2 = document.getElementById('imageForcast2')
        imageForcast3 = document.getElementById('imageForcast3')


        villeMeteo.textContent = data.location.name
        heureMeteo.textContent = data.location.localtime
        tempMeteo.innerHTML = data.current.temp_c + "&#176;"
        condMeteo.textContent = data.current.condition.text
        imageMeteo.src = data.current.condition.icon

        humidity.innerHTML = '<i class="fa-solid fa-droplet"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + data.current.humidity + '%'
        wind.innerHTML = '<i class="fa-solid fa-wind"></i>&nbsp;&nbsp;' + data.current.wind_kph + ' km/h'
        atm.innerHTML = '<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;' + data.current.pressure_mb + ' hPa'

        //FORECAST
        date1.textContent = data.forecast.forecastday[0].date
        date2.textContent = data.forecast.forecastday[1].date
        date3.textContent = data.forecast.forecastday[2].date

        detailsMeteo1.innerHTML = "Min: " + data.forecast.forecastday[0].day.mintemp_c + "&#176;C<br>Max : " + data.forecast.forecastday[0].day.maxtemp_c + "&#176;C"


        detailsMeteo2.innerHTML = "Min: " + data.forecast.forecastday[1].day.mintemp_c + "&#176;C<br>Max : " + data.forecast.forecastday[1].day.maxtemp_c + "&#176;C"

        detailsMeteo3.innerHTML = "Min: " + data.forecast.forecastday[2].day.mintemp_c + "&#176;C<br>Max : " + data.forecast.forecastday[2].day.maxtemp_c + "&#176;C"


        imageForcast1.src = data.forecast.forecastday[0].day.condition.icon
        imageForcast2.src = data.forecast.forecastday[1].day.condition.icon
        imageForcast3.src = data.forecast.forecastday[2].day.condition.icon
      })
  })
