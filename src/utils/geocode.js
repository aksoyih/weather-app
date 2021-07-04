const request = require('request')

const geocode = (adress, callback) => {
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoibG9wb3dvaDM4MyIsImEiOiJja2sxNmpqaHcwb2R4MnF0Zzlybmpobjd4In0.S-PnngFlEmv4h9cleXBPXQ'

    request({
        url: mapbox_url,
        json : true
    },(error, response) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode