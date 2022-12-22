var button= document.querySelector('#button')
var inputElement = document.querySelector('#location-input')
var resultContainer= document.querySelector('#weather')
var city = document.createElement('p')
 resultContainer.append(city)

var localWeatherHeader = document.querySelector('.local-weather')
var placesToGo = document.querySelector('.places-to-go')

const options = {
    // fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment", "geocode"],
  };



button.addEventListener('click',function(event){
    event.preventDefault()

    })

    function renderWeather(city) {

        var city = inputElement.value;
    
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=65ea356fac868b7989b751cef0bfce08&units=imperial")

            
        
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            
    
            var city = document.createElement("p");
            city.textContent = data.name;
            resultContainer.append(city);
    
            var temp = document.createElement("p");
            temp.textContent = "temp:" + data.main.temp + "°F"; 
            resultContainer.append(temp);

          });
        }

    function initMap () {
        const autoComplete = new google.maps.places.Autocomplete(inputElement, options);
        autoComplete.addListener("place_changed", () => {
            console.log(autoComplete.getPlace())
            
            const selectedPlace = autoComplete.getPlace()
            const latitude = selectedPlace.geometry.location.lat()
            const longitude = selectedPlace.geometry.location.lng()
            const coordinates = {
                lat: latitude,
                lng: longitude,
            }
         

            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: coordinates,
            });
            const marker = new google.maps.Marker ({
                position: coordinates,
                map: map,
            });

            const city = selectedPlace.address_components[0]; 

            renderWeather(city)
        })
    }
    window.initMap=initMap;
//  let addressSearchEl= document.getElementById("location-search");
//  addressSearchEl.addEventListener("submit", geocode);

//  function geocode(event) {
//      event.preventDefault();
 
//      let location = inputElement.value;
//      fetch("https://maps.googleapis.com/maps/api/geocode/json", {
//                 params:{
//                  address: location,
//                  key: key,
//              },
//          })
//          .then(function (response) {
//              console.log(response);
 
//              let latitude = response.data.results[0].geometry.location.lat;
//              let longitude = response.data.results[0].geometry.location.lng;
 
//              map.panTo({ lat: latitude, lng: longitude });
//          })
 
//          .catch(function (error) {
//              console.log(error);
//          });
 
//  }

