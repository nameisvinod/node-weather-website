const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWx1Y2FyZGFuIiwiYSI6ImNrYXJ4ODRlNDBtaHkyc250dmhqcWZ1emIifQ.Z6c-YPCrhmdPkUuCD6HgXA&limit=1"
    request({ url: geocodeUrl, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to geocode service.", undefined)
        } else if (body.features.length == 0) {
            callback("Unable to find location. Try another location", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode