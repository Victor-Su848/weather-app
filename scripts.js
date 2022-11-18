const form = document.querySelector("form");
const input = document.getElementById("name");
const infoName = document.querySelector(".info h2");
const currentTemp = document.querySelector(".temp span");
const feelsTemp = document.querySelector(".feels-temp");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");
const icon = document.querySelector(".temp img");
const checkBox = document.getElementById("checkbox");

function convertToFah(temp) {
  return Math.round((temp - 32) * (5 / 9));
}

function convertToCel(temp) {
  return Math.round((temp * (9 / 5)) + 32);
}

checkBox.addEventListener("change", () => {
  if (document.getElementById("checkbox").checked) {
    console.log("checked");
    currentTemp.textContent = convertToCel(currentTemp.textContent);
    feelsTemp.textContent = convertToCel(feelsTemp.textContent);
  } else {
    console.log("unchecked");
    currentTemp.textContent = convertToFah(currentTemp.textContent);
    feelsTemp.textContent = convertToFah(feelsTemp.textContent);
  }
});

async function getInfo(name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=94ed81b061343f42225830b57876c92c`,
      { mode: "cors" },
    );
    const location = await response.json();
    return location;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function displayInfo(response) {
  try {
    checkBox.checked = false;

    const { name } = response;
    const tempK = response.main.temp;
    const tempF = Math.round((tempK - 273.15) * (9 / 5) + 32);
    const feelsTempK = response.main.feels_like;
    const feelsTempF = Math.round((feelsTempK - 273.15) * (9 / 5) + 32);
    const weatherDescrip = response.weather[0].description;
    const humidityPer = response.main.humidity;

    infoName.textContent = name;
    currentTemp.textContent = tempF;
    feelsTemp.textContent = feelsTempF;
    weather.textContent = weatherDescrip;
    humidity.textContent = humidityPer;

    let iconURL = "";
    switch (weatherDescrip) {
      case "clear sky":
        iconURL = "http://openweathermap.org/img/wn/01d@2x.png";
        break;
      case "few clouds":
        iconURL = "http://openweathermap.org/img/wn/02d@2x.png";
        break;
      case "scattered clouds":
        iconURL = "http://openweathermap.org/img/wn/03d@2x.png";
        break;
      case "broken clouds":
        iconURL = "http://openweathermap.org/img/wn/04d@2x.png";
        break;
      case "shower rain":
        iconURL = "http://openweathermap.org/img/wn/09d@2x.png";
        break;
      case "rain":
        iconURL = "http://openweathermap.org/img/wn/19d@2x.png";
        break;
      case "thunderstorm":
        iconURL = "http://openweathermap.org/img/wn/11d@2x.png";
        break;
      case "snow":
        iconURL = "http://openweathermap.org/img/wn/13d@2x.png";
        break;
      case "mist":
        iconURL = "http://openweathermap.org/img/wn/50d@2x.png";
        break;
      default:
        console.log("error");
        break;
    }
    icon.src = iconURL;
  } catch (err) {
    console.log(err);
  }
}

async function getLocationTemp(location) {
  getInfo(location).then((response) => {
    console.log(response);
    displayInfo(response);
  });
}

form.addEventListener("submit", () => {
  const i = input.value;
  getLocationTemp(i);
});

getLocationTemp("College Park");
