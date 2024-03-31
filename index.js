const userTab = document.querySelector("#user-tab")
const searchTab = document.querySelector("#search-tab")
const weatherContainer = document.querySelector('.weather-container')
const locationAccess = document.querySelector('.location-container')
const searchWeather =document.querySelector('.search-weather-container')
const loadingScreen = document.querySelector('.loading-screen-container')
const weatherInfo = document.querySelector('.weather-information-container')
const city = document.querySelector('#city')
const countryFlag = document.querySelector('country-flag')
const weather = document.querySelector('#weather')
const weatherImg = document.querySelector('#weather-image')
const temperature = document.querySelector('#temperature')
const windData = document.querySelector('#wind-data')
const humidityData = document.querySelector('#humidity-data')
const cloudsData = document.querySelector('#clouds-data')

const API_KEY = "898b6975708087bec2a7dc4725cdd1e7"

let currentTab = userTab
currentTab.classList.add("current-tab")

function switchTab(clickedTab){

    if(clickedTab != currentTab){
        
        currentTab.classList.remove('current-tab')
        currentTab=clickedTab
        currentTab.classList.add("current-tab")

        if(!searchWeather.classList.contains('active')){
            locationAccess.classList.remove('active')
            weatherInfo.classList.remove('active')
            searchWeather.classList.add('active')
        }

        else{
            searchWeather.classList.remove('active')
            weatherInfo.classList.remove('active')
            getFromSessionStorage()
        }
    }



}


userTab.addEventListener('click',()=>{
    switchTab(userTab)
})
searchTab.addEventListener('click',()=>{
    switchTab(searchTab)
})
 
function getFromSessionStorage(){
    const localCordinates = sessionStorage.getItem("user-cordinates")
    if(!localCordinates){
        locationAccess.classList.add('active')

    }

    else{
        const cordinates = JSON.parse(localCordinates)
        fetchWeatherInfo(cordinates)
    }
}


async function fetchWeatherInfo(cordinates){
    const {lat , lon} = cordinates
    locationAccess.classList.remove('active')
    loadingScreen.classList.add('active')

    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY} `)
        const data =await result.json()
        loadingScreen.classList.remove('active')
        weatherInfo.classList.add('active')
        
    } catch (error) {
        
    }
}