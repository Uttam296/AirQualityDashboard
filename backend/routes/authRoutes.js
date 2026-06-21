
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// SIGNUP
router.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            username,

            email,

            password: hashedPassword

        });

        await user.save();

        res.json({

            message: "User created successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});



// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                message: "User not found"

            });

        }

        const match = await bcrypt.compare(

            password,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                message: "Invalid password"

            });

        }

        const token = jwt.sign(

            {

                id: user._id

            },

            "SECRET_KEY"

        );

        res.json({

             token,

            userId: user._id


        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


module.exports = router;

