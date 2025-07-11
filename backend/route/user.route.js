import express from 'express';
import User from '../models/user.model.js';
import Jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import protect from '../Middleware/authMiddleware.js';

const route = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
// @access  Public
route.post("/register", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user instance (no manual hashing here)
        user = new User({
            name,
            email,
            password, // let pre-save hook hash this
        });

        // Save user to DB (pre-save will hash password)
        await user.save();

        // Generate JWT Token
        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d", // token valid for 7 days
        });

        // Send response with user details & token
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).send("Server Error");
    }
}));

// @route   POST /api/user/login
// @desc    Authenticate user & get token
// @access  Public


route.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password using model method
        const isMatch = await user.matchPassword(password);
        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Send response
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}));


// @route GET /api/users/profile
// desc Get logged-in user's perofile(protected Route)
// @acess private

route.get("/profile", protect, async(req, res) => {
    res.json(req.user);

})

export default route;
