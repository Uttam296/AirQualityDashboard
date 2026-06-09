const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/api/air", (req, res) => {

    res.json({
        aqi: 135,
        pm25: 72,
        pm10: 98,
        co: 1.1,
        no2: 24
    });

});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});