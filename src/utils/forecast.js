const request = require('request')
const forecast = (latitude,longitude ,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f74d34e5e51d6cafe294e41951043af8&query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true} ,(error,{ body }) => {
    if(error){
        callback('Unable to connect to Weather service !',undefined)
    }
    else if(body.error){
          callback('Unable to find location Try another search',undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions[0] +" And It is currently "+  body.current.temperature+ " degree out .There is "+ body.current.precip+ " % chance of rain")
    }
 })      
 
}
module.exports = forecast