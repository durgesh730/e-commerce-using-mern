import mongoose from "mongoose";
import * as dotenv from 'dotenv' 
dotenv.config()

mongoose.set('strictQuery', true);
export default async function connect(){
    mongoose.connect(process.env.DATA_BASE)
    console.log("Database Connected")
}