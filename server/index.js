import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("DB connected!");
    }).catch(
        err=>{throw err;
    });
}


app.listen(process.env.PORT || 5000, ()=>{
    connect();
    console.log("Server is running!");
});

