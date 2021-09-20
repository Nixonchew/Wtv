const request = require("request")
const fetch = require("node-fetch")
oldDirectionAPI = "https://www.google.com/maps/dir/?api=1&origin=66+Upper+Serangoon+View,+Singapore+533885&origin_place_id=ChIJM_Lq2CQW2jER6vesO4jaGZM&waypoints=Nanyang+Polytechnic+Blk+A,204+Ang+Mo+Kio+Ave+9,Singapore+569773+Ang+Mo+Kio+Ave+9,Singapore+569773|Nanyang+Polytechnic+Block+L,180+Ang+Mo+Kio+Ave+8,Singapore+569830&travelmode=walking"

function getDirectionWithFetch(API){
    return new Promise((resolve,reject)=> {
        fetch(API,{headers:{'Access-Control-Allow-Origin':'*'}}).then(response=>{
            return response.json()    
        }) .then (data=>{
            console.log(data)
        }) .catch(err =>{
            console.log(err)
        })
    })
}

function geolocate(API){
    const options = {
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
        origin_lat = location["lat"].toString()
        origin_lng = location["lng"].toString()
        reverse_api =  `https://maps.googleapis.com/maps/api/directions/json?origin=${origin_lat},${origin_lng}&destination=Nanyang+Polytechnic+Block+L,180+Ang+Mo+Kio+Ave+8,Singapore+569830&waypoints=Nanyang+Polytechnic+Blk+A,204+Ang+Mo+Kio+Ave+9,Singapore+569773+Ang+Mo+Kio+Ave+9,Singapore+569773&travelmode=walking&key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs`
        return (reverse_api)
    })
    
}

async function createRoute(){
    
    geolocation_API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCL1J1qRPLGfBP9AkMp9E0zfD-5_5UZcWs"
    reverse_geocoding_API = await geolocate(geolocation_API)
    console.log(reverse_geocoding_API)
}

createRoute()








function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    });
  
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];
    const checkboxArray = document.getElementById("waypoints");
  
    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true,
        });
      }
    }
  
    directionsService
      .route({
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
  
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");
  
        summaryPanel.innerHTML = "";
  
        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
  
          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }