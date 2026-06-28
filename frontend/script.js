const token = sessionStorage.getItem("token");

const userId = sessionStorage.getItem("userId");


if(!token){

    window.location.href =
    "login.html";

}
const locationBtn =
document.getElementById("locationBtn");

const saveCityBtn =
document.getElementById("saveCityBtn");

const favoriteCitiesDiv =
document.getElementById("favoriteCities");
let map;

let marker;
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

});
let pieChart;
let myChart;
let historyChart;
const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", async () => {

    try {

        const city = document.getElementById("cityInput").value;
        document.getElementById("loading").style.display="block";

        const response = await fetch(
            `http://localhost:3000/api/air?city=${city}`
        );

        const data = await response.json();
const token = sessionStorage.getItem("token");

const userId = sessionStorage.getItem("userId");

await fetch(

    "http://localhost:3000/api/history",

    {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": token

        },

        body: JSON.stringify({

            userId,

            city,

            aqi: data.aqi

        })

    }

);

        document.getElementById("loading").style.display="none";

        document.getElementById("aqi").innerText = data.aqi;
        document.getElementById("pm25").innerText = data.pm25;
        document.getElementById("pm10").innerText = data.pm10;
        document.getElementById("co").innerText = data.co;
        document.getElementById("no2").innerText = data.no2;

        document.getElementById("temperature").innerText =
data.temperature + " °C";

document.getElementById("humidity").innerText =
data.humidity + " %";

document.getElementById("wind").innerText =
data.wind + " m/s";
document.getElementById("weatherIcon").src =

`https://openweathermap.org/img/wn/${data.icon}@2x.png`;

document.getElementById("weatherDescription").innerText =

data.description;
        if (!map) {

    map = L.map("map").setView(
        [data.lat, data.lon],
        10
    );

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(map);

}



        let status = "";
        let recommendation = "";

        if (data.aqi <= 50) {

            status = "🟢 Good";
            recommendation = "Air quality is satisfactory.";

        }
        else if (data.aqi <= 100) {

            status = "🟡 Moderate";
            recommendation = "Acceptable air quality.";

        }
        else if (data.aqi <= 150) {

            status = "🟠 Unhealthy for Sensitive Groups";
            recommendation = "Sensitive people should limit outdoor activity.";

        }
        else if (data.aqi <= 200) {

            status = "🔴 Unhealthy";
            recommendation = "Reduce prolonged outdoor exertion.";

        }
        else if (data.aqi <= 300) {

            status = "🟣 Very Unhealthy";
            recommendation = "Avoid outdoor activity.";

        }
        else {

            status = "⚫ Hazardous";
            recommendation = "Stay indoors and wear masks.";

        }

        document.getElementById("aqiStatus").innerText = status;

        document.getElementById("recommendation").innerText = recommendation;
        if(data.aqi > 200){

    alert(

        "⚠ Very unhealthy air quality detected!"

    );

}

        document.getElementById("gaugeValue").innerText=data.aqi;

let color="green";

if(data.aqi>100){

    color="orange";

}

if(data.aqi>200){

    color="red";

}

document.getElementById("gaugeFill").style.background=color;

        if(myChart){

    myChart.destroy();

}

const ctx = document
    .getElementById("pollutionChart");

myChart = new Chart(ctx, {

    type: "bar",

    data: {

        labels: [

            "PM2.5",
            "PM10",
            "CO",
            "NO₂"

        ],

        datasets: [{

            label: "Pollutant Levels",

            data: [

                data.pm25,
                data.pm10,
                data.co,
                data.no2

            ],

            borderWidth: 1

        }]

    }

});
if(pieChart){

    pieChart.destroy();

}

pieChart = new Chart(

    document.getElementById("pieChart"),

    {

        type:"doughnut",

        data:{

            labels:[

                "PM2.5",

                "PM10",

                "CO",

                "NO₂"

            ],

            datasets:[{

                data:[

                    data.pm25,

                    data.pm10,

                    data.co,

                    data.no2

                ]

            }]

        }

    }

);
drawHistoryChart();

    }

    catch (error) {

        console.log(error);

    }

});

saveCityBtn.addEventListener("click", async () => {

    try {

        const city = document.getElementById("cityInput").value;

        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");

        if (!city) {

            alert("Please enter a city.");

            return;

        }

        const response = await fetch(

            "http://localhost:3000/api/favorites",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": token

                },

                body: JSON.stringify({

                    userId,

                    city

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        displayFavorites();

    }

    catch (error) {

        console.log(error);

    }

});


async function displayFavorites(){

    favoriteCitiesDiv.innerHTML = "";

    const token = sessionStorage.getItem("token");

    const userId = sessionStorage.getItem("userId");

    try{

        const response = await fetch(

            `http://localhost:3000/api/favorites/${userId}`,

            {

                headers:{

                    "Authorization": token

                }

            }

        );

        const favorites = await response.json();

        favorites.forEach(item=>{

            const button =
            document.createElement("button");

            button.className =
            "favorite-city";

            button.innerHTML =

            `${item.city}
            <span class="delete-city">
            ❌
            </span>`;

            button.addEventListener(

                "click",

                ()=>{

                    document.getElementById(
                        "cityInput"
                    ).value = item.city;

                    updateBtn.click();

                }

            );

            button.querySelector(
                ".delete-city"
            ).addEventListener(

                "click",

                async(e)=>{

                    e.stopPropagation();

                    await fetch(

                        `http://localhost:3000/api/favorites/${item._id}`,

                        {

                            method:"DELETE",

                            headers:{

                                "Authorization":token

                            }

                        }

                    );

                    displayFavorites();

                }

            );

            favoriteCitiesDiv.appendChild(
                button
            );

        });

    }

    catch(error){

        console.log(error);

    }

}
displayFavorites();
locationBtn.addEventListener("click",()=>{

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            try{

                const lat =
                position.coords.latitude;

                const lon =
                position.coords.longitude;

                const response =
                await fetch(
                    `http://localhost:3000/api/location?lat=${lat}&lon=${lon}`
                );

                const data =
                await response.json();

                document.getElementById(
                    "cityInput"
                ).value = data.city;

                updateBtn.click();

            }

            catch(error){

                console.log(error);

            }

        }

    );

});
drawHistoryChart();
async function drawHistoryChart(){

    const token = sessionStorage.getItem("token");

    const userId = sessionStorage.getItem("userId");

    try{

        const response = await fetch(

            `http://localhost:3000/api/history/${userId}`,

            {

                headers:{

                    "Authorization": token

                }

            }

        );

        const history = await response.json();

        if(historyChart){

            historyChart.destroy();

        }

        historyChart = new Chart(

            document.getElementById("historyChart"),

            {

                type:"line",

                data:{

                    labels: history.map(item => item.city),

                    datasets:[{

                        label:"AQI",

                        data: history.map(item => item.aqi),

                        fill:false,

                        tension:0.4

                    }]

                }

            }

        );

    }

    catch(error){

        console.log(error);

    }

}
const logoutBtn =
document.getElementById(
    "logoutBtn"
);

logoutBtn.addEventListener(

    "click",

    ()=>{

        sessionStorage.removeItem(
            "token"
        );

        sessionStorage.removeItem(
            "userId"
        );

        window.location.href =
        "login.html";

    }

);