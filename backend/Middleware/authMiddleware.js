import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";

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
      console.log("Decoded JWT payload:", decoded);

      const userId = decoded.user && decoded.user.id;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token payload" });
      }

      console.log("User ID from token:", userId);

      // Either use plain userId or wrap with ObjectId safely
      req.user = await User.findById(userId).select("-password");
      console.log("User found in DB:", req.user);

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }
};

const admin = (req, res, next) => {
  console.log("req.user in admin middleware:", req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { protect, admin };
