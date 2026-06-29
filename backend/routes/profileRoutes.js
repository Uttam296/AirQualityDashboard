const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");
const Favorite = require("../models/Favorite");
const History = require("../models/History");

const router = express.Router();

router.get(
    "/:userId",
    authMiddleware,
    async (req, res) => {

        try {

            const user = await User.findById(req.params.userId);

            const favoriteCount = await Favorite.countDocuments({

                userId: req.params.userId

            });

            const historyCount = await History.countDocuments({

                userId: req.params.userId

            });

            res.json({

                username: user.username,

                email: user.email,

                favorites: favoriteCount,

                searches: historyCount

            });

        }

        catch (error) {

            res.status(500).json({

                error: error.message

            });

        }

    }

);

module.exports = router;