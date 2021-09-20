const request = require('request');
const fetch = require('node-fetch')
API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs"

options = {
    url:API,
    headers: {'Content-type':'application/json'},
    JSON: {"considerIp": true}
}




request.post(options, function callback (err,response,body){
    if (err){
        console.log("POST failed, error:",err)
    }
    
    body  = JSON.parse(body)
    location = body["location"]
    origin_lat = location["lat"]
    origin_lng = location["lng"]
    console.log(body)
    console.log(origin_lat,origin_lng)
})


/**
fetch(API,{method:'POST'}).then(response=>{
    return response.json()
}) .then (data =>{
    console.log(data)
    body  = JSON.parse(data)
    location = body["location"]
    origin_lat = location["lat"].toString()
    origin_lng = location["lng"].toString()
    reverse_api =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin_lat},${origin_lng}&key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs`
    console.log("Returning api as string")
    console.log(reverse_api)
}) .catch (err=>{
    console.log(err)
})
**/

fetch (API,{
    method:'POST',
    JSON: {"considerIp": true}
}) .then (response=>{
    return response.json()
}) .then (body =>{
    location = body["location"]
    origin_lat = location["lat"].toString()
    origin_lng = location["lng"].toString()
    reverse_api =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin_lat},${origin_lng}&key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs`
    console.log(reverse_api)
})