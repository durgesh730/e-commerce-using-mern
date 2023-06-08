import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: String,
            required: true
        },
        count: {
            type: String,
            required: true
        }
    }
});

export default mongoose.model("Items", itemSchema);