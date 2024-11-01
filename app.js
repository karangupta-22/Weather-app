const WEATHER_API_URL = 'api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}';
const API_KEY = '277262994f4120bf73a25b235a6e1b86';


const cityForm = document.querySelector('#city-form');
const searchInput = document.querySelector('#search-input');
const loading = document.querySelector('.loading');
const error = document.querySelector('.error');
const weatherElm = document.querySelector('.weather');
const weatherBehaviorElm = document.querySelector('#behavior');
const weatherIconElm = document.querySelector('#weather-icon');
const temperatureElm = document.querySelector('#temp');
const humidityElm = document.querySelector("#humidity");
const windSpeedElm = document.querySelector("#wind-speed");
const cityElement = document.querySelector("#city");

cityForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const city = searchInput.value;
    if(!city || city.length===0) return;

    const url = getRequestUrl(city);
    initializeState();
    console.log(url);

    const weatherData = await getWeatherData(url);
    if(weatherData) processWeatherData(weatherData);
    toggleLoading();

})

function getRequestUrl(location){
    const apiUrl = new URL(WEATHER_API_URL);
    apiUrl.searchParams.append('apikey',API_KEY);
    apiUrl.searchParams.append('location',location);
    return apiUrl.href;
}

async function getWeatherData(url){
    let response;

    try{
        response = await fetch(url);
    }
    catch(e){
        
    }
    if(response.ok){
        const jason = await response.json();
        return jason;
    }

    error.hidden = false;
    return null;

}

function toggleLoading(){
    loading.toggleAttribute('hidden');
}
function initializeState(){
    toggleLoading();
    error.hidden = true;
    weatherElm.hidden = true;
}
function processWeatherData(data){
    const values = data.data.values;
    const weatherCode = values.weatherCode;
    const weatherBehavior = getBehaviour(weatherCode);
    const weatherIcon = getIcon(weatherCode);
    console.log(weatherCode);
    const temperature = values.temperature;
    const humidity = values.humidity;
    const windSpeed = values.windSpeed;
    const city = data.location.name;
    weatherElm.hidden = false;
    weatherBehaviorElm.textContent = weatherBehavior;
    weatherIconElm.src = new URL(`./images/${weathericon}`,import.meta.url).href;
    console.log(weatherIcon);
    temperatureElm.textContent = +temperature;
    humidityElm.textContent = +humidity;
    windSpeedElm.textContent = +windSpeed;
    cityElement.textContent = city;
    cityElement.setAttribute('title',city);

}

function getBehaviour(weatherCode){
    return weatherBehaviors[+weatherCode];

}

function getWeatherIcon(weatherCode){
    return weatherIcons[+weatherCode];

}