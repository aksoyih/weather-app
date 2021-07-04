const request = require('request')

const forecast = (lat, lon, callback) => {
    const weatherstack_url = 'http://api.weatherstack.com/current?access_key=91320b8191f8060b2e08b2902af0c9cd&query='+lat+','+lon
    
    request({
        url: weatherstack_url,
        json : true
    },(error, response) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(response.body.success == false){
            callback(response.body.error.info, undefined)
        }else{
            callback(undefined, {
            current_temp : response.body.current.temperature,
            feelslike_temp : response.body.current.feelslike,
            location : response.body.location.name + ", " + response.body.location.region,
            description: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast