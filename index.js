const userTab = document.querySelector("#user-tab")
const searchTab = document.querySelector("#search-tab")
const weatherContainer = document.querySelector('.weather-container')
const locationAccess = document.querySelector('.location-container')
const searchWeather =document.querySelector('.search-weather-container')
const loadingScreen = document.querySelector('.loading-screen-container')
const weatherInfo = document.querySelector('.weather-information-container')
const city = document.querySelector('#city')
const countryFlag = document.querySelector('#country-flag')
const weather = document.querySelector('#weather')
const weatherImg = document.querySelector('#weather-image')
const temperature = document.querySelector('#temperature')
const windData = document.querySelector('#wind-data')
const humidityData = document.querySelector('#humidity-data')
const cloudsData = document.querySelector('#clouds-data')
const grantAccess = document.querySelector('#grant-access')
const searchButton = document.querySelector('#search-btn')
const cityName = document.querySelector('#city-name')

const API_KEY = "898b6975708087bec2a7dc4725cdd1e7"

let currentTab = userTab
currentTab.classList.add("current-tab")
locationAccess.classList.add('active')

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
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        const data =await result.json()
        loadingScreen.classList.remove('active')
        weatherInfo.classList.add('active')
        renderWeatherInfo(data)
        
    } catch (error) {
        loadingScreen.classList.remove('active')
    }
}


function renderWeatherInfo(infoWeather){
    city.innerText = infoWeather?.name
    countryFlag.src =`https://flagcdn.com/160x120/${infoWeather?.sys?.country.toLowerCase()}.png`
    weather.innerText=infoWeather?.weather?.[0]?.description
    weatherImg.src = `https://openweathermap.org/img/wn/${infoWeather?.weather?.[0]?.icon}.png`
    temperature.innerText=`${infoWeather?.main?.temp} °C`
    windData.innerText =`${infoWeather?.wind?.speed} m/s` 
    humidityData.innerText=`${infoWeather?.main?.humidity} %` 
    cloudsData.innerText=`${infoWeather?.clouds?.all} %`
} 

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert("No geolocation support available")
    }
}

function showPosition(position){
    const userCordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }

    sessionStorage.setItem('user-cordinates',JSON.stringify(userCordinates))
    fetchWeatherInfo(userCordinates)
}
grantAccess.addEventListener('click' , getlocation)

searchWeather.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(cityName.value ==="") return
    fetchSearchWeatherInfo(cityName.value)
})


async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add('active')
    weatherInfo.classList.remove('active')
    locationAccess.classList.remove('active')


    try {
        let response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        let data =await response.json()
        loadingScreen.classList.remove('active')
        weatherInfo.classList.add('active')
        renderWeatherInfo(data)
        
    } catch (error) {
        console.log(error)
        
    }

}