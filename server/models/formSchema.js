import mongoose from "mongoose";
const { Schema } = mongoose;

const formSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
});

export default mongoose.model("Orderform", formSchema);