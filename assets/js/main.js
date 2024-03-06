const cityName = document.querySelector(".city-name-text");
const degrePar = document.querySelector(".degre-par");
const tempMax = document.querySelector(".temp-max");
const tempMin = document.querySelector(".temp-min");
const humitInfo = document.querySelector(".humit-info");
const cloudInfo = document.querySelector(".cloud-info");
const windInfo = document.querySelector(".wind-info");
const searchInput = document.querySelector("#search-input");
const cityNameText = document.querySelector(".city-name-text");
const cityTime = document.querySelector(".city-time");
const searchIcon = document.querySelector("#search-icon");
const weatherAbout = document.querySelector(".weather-about");
const imgIcon = document.querySelector(".logo-img");
const getWeather = async () => {
    try{
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0cda9900b51a4dfaa92121944240303&q=${searchInput.value}&days=5&aqi=yes&alerts=yes`);
        const {current,location,forecast} = await res.json();
        cityName.innerHTML = location.name;
        cityTime.innerHTML =  location.localtime;
        degrePar.innerHTML = current.feelslike_c + "&deg;";
        tempMax.innerHTML = forecast.forecastday[0].day.maxtemp_c +"&deg;";
        tempMin.innerHTML = forecast.forecastday[0].day.mintemp_c + "&deg;";
        windInfo.innerHTML = current.wind_kph + "km/h";
        humitInfo.innerHTML = current.humidity + "%";
        cloudInfo.innerHTML = current.cloud + "%";
        imgIcon.setAttribute("src","/assets/img/Cloudy.png");
        imgIcon.style.visibility = "visible";
        weatherAbout.innerHTML = current.condition.text;
        console.log(weatherAbout.innerHTML);
        document.body.style.backgroundColor = "white"
        if(weatherAbout.innerHTML == "Partly cloudy" || weatherAbout.innerHTML == "Overcast"){  
            document.body.style.backgroundImage = "url(/assets/img/partly.avif)";
        }
        else if(weatherAbout.innerHTML == "Clear" || weatherAbout.innerHTML == "Sunny"){
            document.body.style.backgroundImage = "url(/assets/img/sunny.jpg)";
            document.body.style.backgroundColor = "white";
        }
        else if(weatherAbout.innerHTML == "Mist" || weatherAbout.innerHTML == "Foggy" || weatherAbout.innerHTML.includes("drizzle")){
            document.body.style.backgroundImage = "url(/assets/img/mist.jpg)";
            document.body.style.backgroundColor = "white";
        }else if(weatherAbout.innerHTML == "Rainy" || weatherAbout.innerHTML.includes("rain")){
            document.body.style.backgroundImage = "url(/assets/img/rain.avif)";
        }else if(weatherAbout.innerHTML.includes("windy")){ 
            document.body.style.backgroundImage = "url(/assets/img/windy.png)";
            document.body.style.backgroundColor = "white";
        }else if(weatherAbout.innerHTML.includes("stormy")){
            document.body.style.backgroundImage = "url(/assets/img/storm.jpg)";
            document.body.style.backgroundColor = "white";
        }else if(weatherAbout.innerHTML.includes("snow")){
            document.body.style.backgroundImage = "url(/assets/img/snow.png)";
            document.body.style.backgroundColor = "white";
        }
    }catch(e){
        console.log(e);
    }
}
searchIcon.addEventListener("click",getWeather);

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const func = (local)=>{
    let mydate = `${local}`;
    let f = `${Date(mydate).split(" ").splice(0,5).slice(-1).toString().split(":")[0] + ":" + Date(mydate).split(" ").splice(0,5).slice(-1).toString().split(":")[1]} - `;
    let dateArray = mydate.split(" ")[0].split("-");
    let year = dateArray[0].slice(2);
    let month = months[parseInt(dateArray[1]) - 1];
    let day = parseInt(dateArray[2]);
    let dateObject = new Date(mydate);
    let dayOfWeek = weekDay[dateObject.getDay() - 1];
    f += `${dayOfWeek}, ${day} ${month} ${year}`;
    return f;
}







