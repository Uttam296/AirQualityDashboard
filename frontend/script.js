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
let myChart;
const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", async () => {

    try {

        const city = document.getElementById("cityInput").value;
        document.getElementById("loading").style.display="block";

        const response = await fetch(
            `http://localhost:3000/api/air?city=${city}`
        );

        const data = await response.json();
        document.getElementById("loading").style.display="none";

        document.getElementById("aqi").innerText = data.aqi;
        document.getElementById("pm25").innerText = data.pm25;
        document.getElementById("pm10").innerText = data.pm10;
        document.getElementById("co").innerText = data.co;
        document.getElementById("no2").innerText = data.no2;

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

    }

    catch (error) {

        console.log(error);

    }

});

saveCityBtn.addEventListener("click",()=>{

    const city =
    document.getElementById("cityInput").value;

    let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

    if(!favorites.includes(city)){

        favorites.push(city);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    }

    displayFavorites();

});

function displayFavorites(){

    favoriteCitiesDiv.innerHTML="";

    let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

    favorites.forEach(city=>{

        const button =
        document.createElement("button");

        button.className =
        "favorite-city";

        button.innerText = city;

        button.onclick = ()=>{

            document.getElementById(
                "cityInput"
            ).value = city;

            updateBtn.click();

        };

        favoriteCitiesDiv.appendChild(
            button
        );

    });

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