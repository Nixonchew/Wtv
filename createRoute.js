
function geolocate(API){
    const options = {
        url:API,
        headers: {'Content-type':'application/json'},
        JSON: {"considerIp": true}
    }
    return new Promise((resolve,reject)=> {
        window.request.post(options, function callback (err,response,body){
            if (err){
                console.log("POST failed, error:",err)
            }
            body  = JSON.parse(body)
            location = body["location"]
            origin_lat = location["lat"].toString()
            origin_lng = location["lng"].toString()
            reverse_api =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin_lat},${origin_lng}&key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs`
            resolve(reverse_api)
        })
    })
}


function reverse_geolocate(API){
    return new Promise ((resolve,reject) =>{
        window.request.get(API, function callback(err,response,body){
            if (err){
                console.log("Post Failed.Error: ",err)
            }
            body = JSON.parse(body)
            results = body["results"]
            dict = results [0]
            if (dict["formatted_address"] || dict["place_id"]){
                address = dict["formatted_address"]
                address = address.replace(/\s/g, '+')
                place_id = dict["place_id"]
                direction_API =  `https://www.google.com/maps/dir/?api=1&origin=${address}&origin_place_id=${place_id}&waypoints=Nanyang+Polytechnic+Blk+A,204+Ang+Mo+Kio+Ave+9,Singapore+569773+Ang+Mo+Kio+Ave+9,Singapore+569773|Nanyang+Polytechnic+Block+L,180+Ang+Mo+Kio+Ave+8,Singapore+569830&travelmode=walking`
                resolve(direction_API)
            }
           
        })
    })
}

async function createRoute(){
    geolocation_API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs"
    reverse_geocoding_API = await geolocate(geolocation_API)
    routeAPI =  await reverse_geolocate(reverse_geocoding_API)
    console.log(routeAPI)
}

createRoute()
  