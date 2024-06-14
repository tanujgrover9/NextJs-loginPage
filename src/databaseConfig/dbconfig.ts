// import mongoose, { connection } from "mongoose";
import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection= mongoose.connection;

        console.log("database connected");
        connection.on('connected',()=>{
            console.log("database connected");
        })
        connection.on('error',(err)=>{
            console.log("MongoDB connection error. Please make sure it is running "+ err);
            process.exit();

        })
        
    } catch (error) {
        console.log("somethis goes wrong");
        
    }
}