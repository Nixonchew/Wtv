var watchID,geoLoc,target;
var flag = false; 
var centered = false;
var target = {latitude:1.379155,longitude:103.849828};


function success(position) {
    var origin_lat = position.coords.latitude;
    var origin_lng = position.coords.longitude;
     // Icons
 var icons = {
    start: new google.maps.MarkerImage(
     "static/start.png",
     // (width,height)
     new google.maps.Size( 44, 44 ),
     // The origin point (x,y)
     new google.maps.Point( 0, 0 ),
     // The anchor point (x,y)
     new google.maps.Point( 22, 32 )
    ),
    marker: new google.maps.MarkerImage(
     new google.maps.MarkerImage(''),
     // (width,height)
     new google.maps.Size( 44, 44 ),
     // The origin point (x,y)
     new google.maps.Point( 0, 0 ),
     // The anchor point (x,y)
     new google.maps.Point( 22, 32 )
    )
   };

    const map = window.map
    window.map.addListener("drag",()=>{
        centered= false
    })
    
    document.getElementById("recenter").addEventListener("click", () => {
        centered = true
        console.log(centered)
        var latlng = new google.maps.LatLng(origin_lat,origin_lng)  
        map.setCenter(latlng)
        map.setZoom(18);
    })
    if (centered){
        console.log("CENTERING")
        var latlng = new google.maps.LatLng(origin_lat,origin_lng)
        map.setCenter(latlng)
        map.setZoom(18);    
    }
    if (target.latitude === origin_lat && target.longitude === crd.longitude){
        alert("You have reached your desination")
        navigator.geolocation.clearWatch(watchID)
    } else{
        const directionsService = new google.maps.DirectionsService();
        const directionRenderer = new google.maps.DirectionsRenderer({preserveViewport:true,suppressMarkers: true});
        directionRenderer.setMap(map);

        if (flag){
            directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : {lat:1.379238,lng:103.849848},
                    waypoints: [
                        {location:{lat:1.380080,lng:103.848500}}
                    ],
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING
                }) .then((response)=>{
                    
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    makeStartMarker(leg.start_location, leg.end_location)
                    makeMarker(leg.end_location, icons.marker,"END")
                })
        // If button is not clicked before
        } else{
            document.getElementById("submit").addEventListener("click", () => {
                flag = true
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : {lat:1.379238,lng:103.849848},
                    waypoints: [
                        {location:{lat:1.380080,lng:103.848500}}
                    ],
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING
                }) .then((response)=>{
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    paths = response.routes[0].legs
                    makeStartMarker(leg.start_location, leg.end_location)
                    for (index in paths){
                        leg = paths[index]
                        makeMarker(leg.end_location, icons.marker,"END")
                    }
                })
            }); 
        }
    }
    }
    function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
    }
function getLocationUpdate(){
    if (navigator.geolocation){
        geoLoc = navigator.geolocation
        // Get current positon 
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
        geoLoc.getCurrentPosition(currentPositionSuccess,currentPositionError,options)
        
            // timeout  in 60 seconds
        var options = {timeout:60000};
        
        // Watch position 
        watchID = geoLoc.watchPosition(success,errorHandler,options)
    } else{
        alert("Browser does not support geolocation!")
    }
}
function currentPositionSuccess(position){
    origin_lat = position.coords.latitude;
    origin_lng = position.coords.longitude
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: { lat: origin_lat, lng: origin_lng },
        zoomControl: false,
    });
}
function currentPositionError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function makeMarker( position, icon, title ) {
    new google.maps.Marker({
     position: position,
     map: map,
     icon: icon,
     title: title
    });
}

function makeStartMarker( position,direction) {
    var heading = google.maps.geometry.spherical.computeHeading(direction,position);
    var line=new google.maps.Polyline({
        clickable:false,
        map:map,strokeOpacity:0,
        path:[position,direction],
        icons:[{offset:'0%' ,
            icon:{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale:7,
                strokeOpacity:1  
                }
            }]
        })
}


   