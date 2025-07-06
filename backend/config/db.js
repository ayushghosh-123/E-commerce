import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.error("MongoDB connection error ❌:", err.message);
        process.exit(1);
    }
};

export default connectDb;

