

window.addEventListener('load',function(){
    let lat;
    let lon;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".temperature");
    let locationTimezone = document.querySelector(".location-timezone");
    let iconImage = document.querySelector(".icon-image");
    const temperatureSpan = document.querySelector(".temperature span");



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = parseFloat(position.coords.longitude);
            lat = parseFloat(position.coords.latitude);

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9169ce6ad2bba899302ec4ef0d23f36f`;
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const {description, icon} = data.weather[0]
                    const {country} = data.sys;

                    let tempCelsius = Math.floor(temp - 273.15);

                    function generateUrl (icon) {
                        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    }

                    // Set DOM Elements from API
                    temperatureDegree.textContent = tempCelsius;
                    temperatureDescription.textContent = description.toUpperCase();
                    locationTimezone.textContent = country;
                    iconImage.src = generateUrl(icon);

                    // Set temperature from Kelvins to Celsius
                    let fahrenheit = tempCelsius * 9/5 + 32;

                    // Change Kelvins to Celcius
                    temperatureSection.addEventListener("click", () =>{
                        if(temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(fahrenheit);
                        } else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = tempCelsius;
                        }
                    })
                })
        });
    }
})