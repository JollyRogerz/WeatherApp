const appKey = "f24f40b1c24505685fce3b8acd0fcffc";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let save = document.getElementById("save");

save.addEventListener("click", saveWeather);
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {

    } else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function saveWeather()
    {
        var obj = { city : searchInput.value,
                    temperature : temperature.innerHTML,
                    humidity : humidity.innerHTML
                  };

    localStorage.setItem('myObj', JSON.stringify(obj));

    (async () => {


        var weatherTimeUnix = Math.round((new Date()).getTime() / 1000)

        var tx =
            await arweave.createTransaction(
            {
                data: JSON.stringify(obj),
            },
                wallet,
        )

        tx.addTag('App-Name', 'WeatherApp')
        tx.addTag('App-Version', '0.0.1')
        tx.addTag('Unix-Time', weatherTimeUnix)
        await arweave.transactions.sign(tx, wallet)
        console.log(tx.id)
        console.log(tx.data)
        await arweave.transactions.post(tx)
        alert('Weather Saved')

    })()
}

function change()
{
    
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}