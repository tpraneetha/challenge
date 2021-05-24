//url and api
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=19ba431c3fea44c4469111d60f7c2d18";
//date
const date = new Date();
const newDate =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

//event listener

// document.getElementById("generate").addEventListener("click", weatherGenerator);
export function weatherGenerator(e) {
  const zip = document.getElementById("zipCode").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apiKey).then(function (weatherData) {
    console.log(weatherData);
    const temperature = weatherData.main.temp;
    const feeling = feelings;
    postData("/addWeather", {
      temp: temperature,
      date: newDate,
      feeling: feeling,
    }).then(() => {
      updateUI();
    });
  });
}
//async getWeather function
const getWeather = async (baseURL, zip, apiKey) => {
  //fetch the dynamic url
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const weatherData = await res.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    //boilerplate
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    //Body data type must match Content-Type
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const getData = async (url = "") => {
  const request = await fetch(url);
  try {
    const getData = await request.json();
  } catch (error) {
    console.log("error", error);
  }
};
//ui update
const updateUI = async () => {
  const req = await fetch("/getData");
  try {
    const allData = await req.json();
    document.getElementById("date").innerHTML = allData["date"];
    document.getElementById("temp").innerHTML = allData["temp"];
    document.getElementById("content").innerHTML = allData["feeling"];
  } catch (error) {
    console.log("error", error);
  }
};
