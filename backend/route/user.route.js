import express from 'express';
import User from '../models/user.model.js';
import Jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import {protect} from '../Middleware/authMiddleware.js';

const route = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
// @access  Public
route.post("/register", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password, // Pre-save hook should hash this
    });

    if (user) {
        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
}));

// @route   POST /api/user/login
// @desc    Authenticate user & get token
// @access  Public
route.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
}));

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Private
route.get("/profile", protect, asyncHandler(async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        });
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
}));

export default route;

