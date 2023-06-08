import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    ItemId: {
        type:Number,
        required: true
    },

    Count: {
        type: Number,
        required: true
    }
});

export default mongoose.model("cart", itemSchema);