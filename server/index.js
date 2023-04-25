import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MongoClient } from "mongodb";

const app = express();
dotenv.config();

const uri = "mongodb+srv://teagadget:teagadget@teagadget.ihhlcxe.mongodb.net/test";
const client = new MongoClient(uri);

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

app.post("/updatelastbrew", async (req, res) => {

    const database = client.db("TeaGadget");
    const gadgets = database.collection("TeaGadget");    

    const filter = {room_number:2020};

    const currentdate = new Date();
    const updateDoc = {
      $set: {
        sincelastbrew: currentdate.toLocaleTimeString()
      },
    };
    const result = await gadgets.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.redirect("/");
});

app.post("/tearooms", (req, res) => {
    console.log("tea rooms loaded");
    res.redirect("/tearooms")
});

app.post("/loadroomdetails", (req, res) => {
    console.log("details loaded");
    res.redirect("/roomdetails");
});