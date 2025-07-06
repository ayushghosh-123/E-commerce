import express from 'express';
import User from '../models/user.model.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // for hashing passwords

const route = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
// @access  Public
route.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password, // we'll hash this before saving
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // Generate JWT Token
        const payload = {
            user: {
                id: user._id,
                role: user.role, // i   nclude role if needed
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
            // Mongoose validation error (like invalid email)
            return res.status(400).json({ message: error.message });
        }

        res.status(500).send("Server Error");
    }
});

// user login post /api/user/login
// authenticate user
// public

route.post('/login', )

export default route;
