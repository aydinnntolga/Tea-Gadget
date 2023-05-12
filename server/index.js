import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MongoClient } from "mongodb";

const app = express();
dotenv.config();

const uri = "mongodb+srv://teagadget:teagadget@teagadget.ihhlcxe.mongodb.net/test";
const client = new MongoClient(uri);
const database = client.db("TeaGadget");
const gadgets = database.collection("TeaGadget");    

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
 
    const filter = {room_number:2020};
    const currentdate = new Date();
    const updateddate = currentdate.toLocaleString()
    const updateDoc = {
      $set: {
        sincelastbrew: updateddate,
        cauldron_status: "nonempty"
      },
      $push: {
        brewhistory: updateddate
      }

    };
    const result = await gadgets.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.redirect("/");
});

app.post("/tearanout", async (req,res)=>{

  const filter = {room_number:2020};
  const updateDoc = {
    $set: {
      cauldron_status: "empty"
    },
  };
  const result = await gadgets.updateOne(filter, updateDoc);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  );
  res.redirect("/");  

})


app.get("/tearooms/:buildingname",async(req,res) => {

    gadgets.find({faculty_name:req.params.buildingname.substring(1)}).toArray()
    .then(data => {
        /*const time = { 
            brewtime_millisecond: data.sincelastbrew.getTime(),
            room:data.room_number,
            brewdate : data.sincelastbrew.toLocaleTimeString(),
            floor: data.floor,
            cauldronstatus: data.cauldron_status
          };*/
        res.json(data);
    })
    
});

app.post("/tearooms/:buildingname", (req, res) => {
    console.log("tea rooms loaded");
    const buildingname = req.params.buildingname.substring(1)
    res.redirect("/tearooms/"+buildingname)
});

app.post("/loadroomdetails", (req, res) => {
    console.log("details loaded");
    res.redirect("/roomdetails");
});