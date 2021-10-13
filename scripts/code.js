const chinatown = [ 
    { 
        name: "Chinese Heritage Center", 
        location: { 
            lat: 1.445757, // add here latitude if using static data 
            lng: 103.795065, // add here longitude if using static data 
  
        },
        content:"Get transported back in time and experience the footsteps \n of migrants in the late 19th century of singapore",
        src:'https://rayrixo.github.io/Fyp_testingAR/testin.html' 
    }, 
  
    { 
        name: "Sri Maraimman Temple", 
        location:{ 
            lat:1.445405, 
            lng:103.795335, 
        },
        content:'This hindu temple is the oldest \n and largest of its kind in singapore',
        src:'https://rayrixo.github.io/Fyp_testingAR/SriMariamman.html'  
    }, 
  
    { 
        name: "Masjid Jamae", 
        location:{ 
            lat:1.445077, 
            lng:103.794433, 
        },
        content:'Established in 1826 it is one of the oldest mosque in \n singapore One of the only six in the \n country that conducts sermons in tamil',
        src:'https://rayrixo.github.io/Fyp_testingAR/MasjidJamae.html' 
    }, 
  
    { 
        name: "Mural at Mohamed Ali Lane", 
        location:{ 
            lat:1.2827594818546095,  
            lng:103.84583411762635, 
        }, 
        content:'Witness murals that depict the past \n through the eyes of singaporean artist Yip Yew Chong.',
        src:'https://rayrixo.github.io/Fyp_testingAR/MuralStreet.html'
    }, 
  
    { 
        name: "Tong Heng", 
        location:{ 
            lat:1.281370, 
            lng:103.844937, 
        },
        content:'Tong Heng is the oldest confectioneries. \n Witness a story of resilience, \n determination and resourcefulness.',
        src:'https://rayrixo.github.io/Fyp_testingAR/TongHeng.html'
    }, 
  
    { 
        name: "Buddha Tooth Relic Temple", 
        location:{ 
            lat:1.281458, 
            lng:103.844192, 
        },
        content:'This place hold special meaning for buddhist people as it stores the left canine tooth of buddha',
        src:'https://rayrixo.github.io/Fyp_testingAR/BuddhaToothRelic.html' 
    }, 
  
    { 
        name: "Sago Street", 
        location:{ 
            lat:1.281683, 
            lng:103.844203, 
        },
        content:'Experience the street of the dead where immigrants of the past with no family lived and died',
        src:'https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html' 
    }, 
  ];
  
  window.onload = () => {
  
    var localStorage= window.localStorage 
    if (localStorage.getItem('landmarkIndex')){ 
        var landmarkIndex=localStorage.getItem('landmarkIndex'); 
    } else{ 
        var landmarkIndex = localStorage.setItem('landmarkIndex',0); 
    }
  
  
  
    
    const indexButton_Testin = document.getElementById('complete_testin');
    indexButton_Testin.onclick = function(){
        i = landmarkIndex;
        landmarkIndex = localStorage.getItem('landmarkIndex');
        landmarkIndex = localStorage.setItem('landmarkIndex',++i);
      
        if (landmarkIndex == chinatown.length-1){
          window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/congrats.html";
        }
  
       switch (landmarkIndex){
          case 1:
            window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/srimarimman.html";
       
          case 2:
            window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/masjidjamae.html";
        
          case 3:
            window.location = "https:/nixonchew.github.io/Fyp_testingAR/congratsPages/muralatmohamedali.html";
  
          case 4:
            window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/tongheng.html";
  
          case 5:
            window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/buddhatoothrelic.html";
  
          case 6:
            window.location = "https://nixonchew.github.io/Fyp_testingAR/congratsPages/sagstreet.html";
  
       }
      }
  
      const congratButton = document.getElementById('congrats_button');
      congratButton.onclick = function(){
        window.location = "https://rayrixo.github.io/Fyp_testingAR/main.html";
      }
    
    //   const indexButton_Sri = document.getElementById('completeButton');
    // indexButton_Sri.onclick = function(){
    //     i = landmarkIndex;
    //     landmarkIndex = localStorage.getItem('landmarkIndex');
    //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    //     console.log(i);
    //     window.location = "https://rayrixo.github.io/Fyp_testingAR/MasjidJamae.html";
    //   }
    
    
    
    // const indexButton = document.getElementById('completeButton');
    // indexButton.onclick = function(){
    // i = landmarkIndex;
    // landmarkIndex = localStorage.getItem('landmarkIndex');
    // landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    // console.log(i);
    // window.location = "https://rayrixo.github.io/Fyp_testingAR/TongHeng.html";
    // }
    
    
    
    
    // const indexButton = document.getElementById('completeButton');
    // indexButton.onclick = function(){
    // i = landmarkIndex;
    // landmarkIndex = localStorage.getItem('landmarkIndex');
    // landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    // console.log(i);
    // window.location = "https://rayrixo.github.io/Fyp_testingAR/BuddhaToothRelic.html";
    // }
    
    
    
    // const indexButton = document.getElementById('completeButton');
    // indexButton.onclick = function(){
    //     i = landmarkIndex;
    //     landmarkIndex = localStorage.getItem('landmarkIndex');
    //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    //     console.log(i);
    //     window.location = "https://rayrixo.github.io/Fyp_testingAR/PagodaStreet.html";
    // }
    
    
    // const indexButton = document.getElementById('completeButton');
    // indexButton.onclick = function(){
    //     i = landmarkIndex;
    //     landmarkIndex = localStorage.getItem('landmarkIndex');
    //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    //     console.log(i);
    //     window.location = "https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html";
    //   }
    
    
    //   const indexButton = document.getElementById('completeButton');
    // indexButton.onclick = function(){
    //     i = landmarkIndex;
    //     landmarkIndex = localStorage.getItem('landmarkIndex');
    //     landmarkIndex = localStorage.setItem('landmarkIndex',++i);
    
    //     console.log(i);
    //     window.location = "https://rayrixo.github.io/Fyp_testingAR/SagoStreet.html";
    //   }
    
    
    //   const indexButton = document.getElementById('completeButton');
    //   indexButton.onclick = function(){
    //       i = landmarkIndex;
    //       landmarkIndex = localStorage.getItem('landmarkIndex');
    //       landmarkIndex = localStorage.setItem('landmarkIndex',++i);
      
    //       console.log(i);
    //       window.location = "https://rayrixo.github.io/Fyp_testingAR/MuralStreet.html";
    //     }
      
      
    
    
    
    
    // if(indexButton.clicked == true){
    //         localStorage.setItem('landmarkIndex',++i);
    // }
    
    
    }