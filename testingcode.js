window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
    
    
    
 
};

function getLocation(){
    navigator.geolocation.getCurrentPosition(showposition);
}

function showposition(currentPosition){
    userlat = currentPosition.coords.latitude;
    userlng = currentPosition.coords.longitude;
}

function staticLoadPlaces() {
    return [
        {
            name: 'Testing',
            location: {
                lat: 1.445723, //1.378043
                lng: 103.795070,//103.850071
            },

            body:'./assets/magnemite/scene.gltf'

 
        },

        {
            name:"Test2",
            location:{
                lat:1.445203,
                lng:103.794357
            },
            body:'./assets/magnemite/scene.gltf'
        },
 
         {
             name: 'YCK',
             location: {
                 lat: 1.381590,
                 lng: 103.844905,
             },

             body: './assets/articuno/scene.gltf'
 
         },
         
         {
             name: 'Block_A',
             location: {
                 lat: 1.380099,
                 lng: 103.848593,
             },

             body:'./assets/dragonite/scene.gltf'
 
         },
 
 
         {
             name: 'Block_L',
             location: {
                 lat: 1.379198,
                 lng: 103.849562,
             },

             body:'./assets/dragonite/scene.gltf'
 
         },
        
    ];
 }
 


var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');


    places.forEach((place) => {
        distance = 0;
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // let camera = document.querySelector("a-camera");
        // camera.setAttribute('gps-camera','maxDistance: 20;');

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        // model.setAttribute('gltf-model', `${body}`);
        
        

        setModel(models[modelIndex], model);

        // model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}