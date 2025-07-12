import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        require: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    sku: {
        type: String, // changed from Number to String
        unique: true,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String
    },
    sizes:{
        type: [String],
        required: true
    },
    colors:{
        type: [String],
        required: true
    },
    material:{
        type: String
    },
    gender:{
        type: String,
        enum: ["Men", "Women", "Unisex"]
    },
    images: [ // renamed from image → images
        {
            url: {
                type: String,
                required: true
            },
            altText: { // corrected "allText" → "altText"
                type: String
            }
        }
    ],
    isFeatured:{
        type: Boolean,
        default: false
    },
    isPublished:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 0
    },
    numReview:{
        type: Number,
        default: 0
    },
    tags: [String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    metaTitle:{
        type: String
    },
    metaDescription:{ // fixed typo
        type: String
    },
    metaKeywords:{
        type: String
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    weight: {
        type: String // added weight if needed (missing in your schema)
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;

