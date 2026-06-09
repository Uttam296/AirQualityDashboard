const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", async () => {

    try {

        const response = await fetch("http://localhost:3000/api/air");

        const data = await response.json();

        document.getElementById("aqi").innerText = data.aqi;
        document.getElementById("pm25").innerText = data.pm25;
        document.getElementById("pm10").innerText = data.pm10;
        document.getElementById("co").innerText = data.co;
        document.getElementById("no2").innerText = data.no2;

    }

    catch (error) {

        console.log(error);

    }

});