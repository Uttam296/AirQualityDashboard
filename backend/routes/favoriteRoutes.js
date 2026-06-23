const authMiddleware =
require("../middleware/authMiddleware");
const express = require("express");

const Favorite = require("../models/Favorite");

const router = express.Router();


// Add favorite city

router.post(
    "/",
    authMiddleware,
    async(req,res)=>{
    try {

        const favorite = new Favorite({

            userId: req.body.userId,

            city: req.body.city

        });

        await favorite.save();

        res.json({

            message: "Favorite city added"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// Get all favorites of a user

router.get(
    "/:userId",
    authMiddleware,
    async(req,res)=>{
    try {

        const favorites = await Favorite.find({

            userId: req.params.userId

        });

        res.json(

            favorites

        );

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// Delete favorite city

router.delete("/:id", async (req, res) => {

    try {

        await Favorite.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message: "Favorite deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

module.exports = router;

