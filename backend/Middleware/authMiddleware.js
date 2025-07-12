import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect route
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded JWT:", decoded);

            // Support both { id: ... } and { user: { id: ... } } payloads
            const userId = decoded.id || (decoded.user && decoded.user.id);
            if (!userId) {
                return res.status(401).json({ message: "Not authorized, invalid token payload" });
            }

            req.user = await User.findById(userId).select("-password");
            console.log("User found in protect middleware:", req.user);

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// Middleware to check if user is an admin
const admin = (req, res, next) => {
    console.log("req.user in admin middleware:", req.user);
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

// Export both middlewares
export { protect, admin };