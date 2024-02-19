document.addEventListener("DOMContentLoaded", function() {
  const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const apikey = "ed19472b949e0cfbe4c444cf4c36e8e9"; 
  const searchbox = document.querySelector(".search input");
  const searchbtn = document.querySelector(".search button");

  async function checkweather(city) {
    const response = await fetch(URL + city + `&appid=${apikey}`);
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".container1").style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".location").innerHTML = data.name;
        document.querySelector(".temprature").innerHTML = Math.round(data.main.temp) + "° C " + data.weather[0].description + " .";
        document.querySelector(".container.text-center .row .col:nth-child(1)").innerHTML = "Wind Speed" + " = " + Math.round(data.wind.speed) + "6km/h";
        document.querySelector(".container.text-center .row .col:nth-child(2)").innerHTML = "Humidity" + " = " + data.main.humidity + "%";
        document.querySelector(".container.text-center .row .col:nth-child(3)").innerHTML = "Pressure" + " = " + data.main.pressure + "mb";
        document.querySelector(".container1").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } 
  }

  searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
  });
});
