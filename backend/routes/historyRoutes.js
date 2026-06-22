const express = require("express");

const History = require("../models/History");

const router = express.Router();


// Save search history

router.post("/", async (req, res) => {

    try {

        const history = new History({

            userId: req.body.userId,

            city: req.body.city,

            aqi: req.body.aqi

        });

        await history.save();

        res.json({

            message: "History saved"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// Get all history of a user

router.get("/:userId", async (req, res) => {

    try {

        const history = await History.find({

            userId: req.params.userId

        });

        res.json(

            history

        );

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

module.exports = router;