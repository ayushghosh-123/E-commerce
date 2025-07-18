import mongoose from "mongoose";
import dotenv  from "dotenv"
import Product from "./models/product.model.js"
import User from "./models/user.model.js"
import data from "./data/sender.js"
import CartItemSchema from "./models/Cart.model.js";
dotenv.config()

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URL)

// Function to seed data
const seedData = async()=>{
    try {
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // craete a default admin user
        const createUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        })

        const userID = createUser._id

        const sampleProducts = data.map((product)=> {
            return{...product, user: userID}
        })

        await Product.insertMany(sampleProducts)

        console.log("prodcts data seeds succesfully")
        process.exit()
    } catch (error) {
        console.error("Error sending the data: ", data)
        process.exit(1)
    }
}

seedData()