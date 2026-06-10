const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = 3000;

const API_KEY = process.env.AQICN_API_KEY;

app.get("/api/air", async (req, res) => {

    try {

        const city = req.query.city;

        const response = await axios.get(
            `https://api.waqi.info/feed/${city}/?token=${API_KEY}`
        );

       console.log(JSON.stringify(response.data, null, 2));

        const data = response.data.data;

        res.json({

            aqi: data.aqi || "N/A",

            pm25: data.iaqi?.pm25?.v || "N/A",

            pm10: data.iaqi?.pm10?.v || "N/A",

            no2: data.iaqi?.no2?.v || "N/A",

            co: data.iaqi?.co?.v || "N/A"

        });

    }

    catch (error) {

        console.log(error.message);

        if (error.response) {

            console.log(error.response.data);

        }

        res.status(500).json({

            error: error.message

        });

    }

});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});