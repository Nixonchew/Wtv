var watchID,geoLoc,target,travelMode;
var flag = false; 
var notAtTrail = true
var centered = false;
var completeButtonFlag = false;
var getRouteButtonFlag = false;
var gMarkers = []
var target = {latitude:1.379155,longitude:103.849828};
var landmarkIndex = 0

const loadPlaces = function() {
    const chinatown = [ 
        { 
            name: "Chinese Heritage Center", 
            location: { 
                lat: 1.445757, // add here latitude if using static data 
                lng: 103.795065, // add here longitude if using static data 
     
            },
            content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
            src:'https://nixonchew.github.io/Wtv/landmarks/chineseheritagecenter.html' 
        }, 
     
        { 
            name: "Sri Maraimman Temple", 
            location:{ 
                lat:1.282644, 
                lng:103.845227, 
            },
            content:'This hindu temple is the oldest \n and largest of its kind in singapore',
            src:'https://nixonchew.github.io/Wtv/landmarks/SriMariamman.html'   
        }, 
     
        { 
            name: "Masjid Jamae", 
            location:{ 
                lat:1.283190, 
                lng:103.845329, 
            },
            content:'Established in 1826 it is one of the oldest mosque in \n singapore One of the only six in the \n country that conducts sermons in tamil',
            src:'https://nixonchew.github.io/Wtv/landmarks/MasjidJamae.html'  
        }, 
     
        { 
            name: "Mural at Mohamed Ali Lane", 
            location:{ 
                lat:1.2827594818546095,  
                lng:103.84583411762635, 
            }, 
            content:'Witness murals that depict the past \n through the eyes of singaporean artist Yip Yew Chong.',
            src:'https://nixonchew.github.io/Wtv/landmarks/MuralStreet.html' 
        }, 
     
        { 
            name: "Tong Heng", 
            location:{ 
                lat:1.281370, 
                lng:103.844937, 
            },
            content:'Tong Heng is the oldest confectioneries. \n Witness a story of resilience, \n determination and resourcefulness.',
            src:'https://nixonchew.github.io/Wtv/landmarks/TongHeng.html' 
        }, 
     
        { 
            name: "Buddha Tooth Relic Temple", 
            location:{ 
                lat:1.281458, 
                lng:103.844192, 
            },
            content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha',
            src:'https://nixonchew.github.io/Wtv/landmarks/BuddhaToothRelic.html' 
        }, 
     
        { 
            name: "Pagoda Street", 
            location:{ 
                lat:1.283330, 
                lng:103.844450, 
            },
            content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha',
            src:'https://nixonchew.github.io/Wtv/landmarks/PagodaStreet.html'
        },

        { 
            name: "Sago Street", 
            location:{ 
                lat:1.281683, 
                lng:103.844203, 
            },
            content:'Experience the street of the dead where immigrants of the past with no family lived and died',
            src:'https://nixonchew.github.io/Wtv/landmarks/SagoStreet.html' 
        }, 
    ];

    return Promise.resolve(chinatown);
};
$('#dialog').hide();

var rad = function(x) {
    return x * Math.PI / 180;
};

function getDistance(mk1){
    var R = 6378137; // Radius of the Earth in miles
    var mk2 = {lat: 1.2827156284699024 ,lng:103.84397634403197 }
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

function makeMarker( position, icon, title ) {
    marker = new google.maps.Marker({
     position: position,
     map: map,
     icon: icon,
     title: title
    });
    return marker
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
    return line
}

function removeMarkers (){
    for(i=0; i<gMarkers.length; i++){
        gMarkers[i].setMap(null);
    }
}

// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'CRDMPAGPE4KCZOMKKCLKKSJOKUKJZVE54LUROL2GLDS3UMTA',
        clientSecret: 'TCWSXDU33J30GFTTPDRVL4SXMGMT3ON0ZWZVXWQPPINDMMWD',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // then use it to load from remote APIs some places nearby
        loadPlaces()
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const content = place.content;
                    const src = place.src;

                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', './assets/map-marker.png');
                    

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '20, 20');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            const para = document.createElement('p');
                            const butt = document.createElement('a');
                            
                            butt.setAttribute('class','btn btn-primary');
                            butt.setAttribute('href',src);                            
                            container.setAttribute('id', 'place-label');
                            label.innerText = name;
                            para.innerText = content;
                            butt.innerText = "More Info";
                            container.appendChild(label);
                            label.appendChild(para);
                            label.appendChild(butt);
                            
                            document.body.appendChild(container);

                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 3500);
                        }
                    };

                    icon.addEventListener('click', clickListener);
                    scene.appendChild(icon);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 20000,
        }
    );
};

//code for the drop down menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 


  function success(position) {
    var origin_lat = position.coords.latitude;
    var origin_lng = position.coords.longitude;
    origin = {lat : origin_lat , lng : origin_lng}
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
        )
    };
    
    var markers = {
        0 : new google.maps.MarkerImage(
            '',
            // (width,height)
            new google.maps.Size( 44, 44 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 22, 32 )
        ),
        1 : new google.maps.MarkerImage(
            '',
            // (width,height)
            new google.maps.Size( 44, 44 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 22, 32 )
        ),
    }
    

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
        var latlng = new google.maps.LatLng(origin_lat,origin_lng)
        map.setCenter(latlng)
        map.setZoom(18);    
    }
    if (target.latitude === origin_lat && target.longitude === origin_lng){
        alert("You have reached your desination")
        navigator.geolocation.clearWatch(watchID)
    } else{
        const directionsService = new google.maps.DirectionsService();
        const directionRenderer = new google.maps.DirectionsRenderer({preserveViewport:true});
        if(!completeButtonFlag){
            completeButtonFlag = true
            
             // --TO DO --  Display route on click
            document.getElementById("complete").addEventListener("click", () => {
                console.log("Compelte button pressed")
                landmarkIndex += 1 
                directionRenderer.set('directions', null)
                removeMarkers()
                
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[landmarkIndex].location,   
                    travelMode: google.maps.TravelMode["WALKING"]
                }) .then((response)=>{
                    console.log(response)
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                })  
                  
            })
        }

        directionRenderer.setMap(map);
        distance = getDistance(origin)
        // If not at trail yet
        if (distance<700){
            console.log(travelMode)
            if (flag){
                directionRenderer.setMap(null); 
                removeMarkers()
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[0].location,   
                    travelMode: google.maps.TravelMode[travelMode]
                }) .then((response)=>{
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                    gMarker = makeStartMarker(leg.start_location, leg.end_location)
                    gMarkers.push(gMarker)
                })
            }
            document.getElementById("submit").addEventListener("click", function showDialog() {
                flag = true
                $('#dialog').show();
                $('#dialog').dialog();
                $( "#dialog" ).on('dialogclose', function() {
                    travelMode = $('#option').val();
                    directionsService.route({
                        origin : {lat:origin_lat, lng:origin_lng},
                        destination : Chinatown[0].location,   
                        travelMode: google.maps.TravelMode[travelMode]
                    }) .then((response)=>{
                        directionRenderer.setDirections(response);
                        const route = response.routes[0];
                        var leg = route.legs[0]
                        instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                        document.getElementById("instructions").innerHTML = instructions
                        gMarker = makeStartMarker(leg.start_location, leg.end_location)
                        gMarkers.push(gMarker)
                    })
                })  
            }) 
            
        }
        
        // If at the trail already
        // TO-DO For loop go through Chinatown[i].location and get route to next landmark
        else{
            if (flag){
                directionRenderer.setMap(null); 
                removeMarkers()
                directionsService.route({
                    origin : {lat:origin_lat, lng:origin_lng},
                    destination : Chinatown[landmarkIndex].location,   
                    travelMode: google.maps.TravelMode.WALKING
                }) .then((response)=>{
                    directionRenderer.setDirections(response);
                    const route = response.routes[0];
                    var leg = route.legs[0]
                    instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                    document.getElementById("instructions").innerHTML = instructions
                    paths = response.routes[0].legs
                    gMarker = makeStartMarker(leg.start_location, leg.end_location)
                    gMarkers.push(gMarker)
                })
            } 

            if (!getRouteButtonFlag){
                // Set get route button 
                getRouteButtonFlag = true
                document.getElementById("submit").addEventListener("click", () => {
                    flag = true
                    directionsService.route({
                        origin : {lat:origin_lat, lng:origin_lng},
                        destination : Chinatown[landmarkIndex].location,
                        travelMode: google.maps.TravelMode.WALKING
                    }) .then((response)=>{
                        directionRenderer.setDirections(response);
                        const route = response.routes[0];
                        var leg = route.legs[0]
                        // TO-DO  Direction Instructions
                        instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
                        document.getElementById("instructions").innerHTML = instructions
                        paths = response.routes[0].legs
                        gMarker = makeStartMarker(leg.start_location, leg.end_location)
                        gMarkers.push(gMarker)
                    })
                }); 
            }
            
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
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
        geoLoc.getCurrentPosition(currentPositionSuccess,currentPositionError,options)

        // timeout  in 60 seconds
        var options = {timeout:60000};
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