const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=94c48b2e8ccd53bfc824605675a3c35b&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!')
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, 'Conditions:' +
                body.current.weather_descriptions[0] +
                ', It is currently ' + body.current.temperature + ' Fahrenheit,' +
                ' feels like: ' + body.current.feelslike + ', Humidity: ' + body.current.humidity +
                ', Time: ' + body.current.observation_time)
        }

    })

}


module.exports = forecast