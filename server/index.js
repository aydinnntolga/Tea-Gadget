import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import CASAuthentication from 'cas-authentication';
import session from 'express-session'; 


dotenv.config();

const app = express();

app.use(session({
  secret: 'super secret key',
  resave: false,
  saveUninitialized: true
}));


const cas = new CASAuthentication({
  cas_url: 'https://login.sabanciuniv.edu/cas',
  service_url: `http://localhost:${process.env.PORT || 3000}/admin`,
  cas_version: '3.0',
  session_name: 'cas_user',
  renew: false,
  is_dev_mode: false,
  session_info: 'cas_userinfo',
  destroy_session: false
});


const uri = process.env.MONGO; 
const client = new MongoClient(uri);
const database = client.db("TeaGadget");
const gadgets = database.collection("TeaGadget");


const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("DB connected!");
    }).catch(err => {throw err;});
}




app.listen(process.env.PORT || 5000, ()=>{
    connect();
    console.log("Server is running!");
});

app.get('/login', cas.bounce_redirect);


app.get('/admin', cas.bounce, (req, res) => {
  if (req.session.cas_user) {
    res.send(`Hoşgeldiniz, ${req.session.cas_user}`);
  } else {
    
    res.redirect('/');
  }
});

app.get("/roomsData",async(req,res) => {

  gadgets.find().toArray()
  .then(data => {
      res.json(data);
  })
  
});


app.get('/api/userinfo', cas.bounce, (req, res) => {
  if (req.session.cas_user) {
    res.json({ username: req.session.cas_user });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post("/updatelastbrew", async (req, res) => {
    const room = parseInt(req.headers['roomnum']);

    const filter = {room_number:room};
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

  const room = parseInt(req.headers['roomnum']);


  const filter = {room_number:room};
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

app.post("/teaready", async (req,res)=>{

  const room = parseInt(req.headers['roomnum']);


  const filter = {room_number:room};
  const updateDoc = {
    $set: {
      cauldron_status: "nonempty"
    },
  };
  const result = await gadgets.updateOne(filter, updateDoc);
  


  const document = await gadgets.findOne(filter)
  var lastbrewingtime = document['sincelastbrew']
  const currenttime = new Date().getTime()
  lastbrewingtime = new Date(lastbrewingtime).getTime()


  if((currenttime - lastbrewingtime) /60000 <20){


    const prevbrewingtime =  document['brewhistory'][document['brewhistory'].length - 2];
    
    console.log(prevbrewingtime)

    const removelast = {
      $pop: {
        brewhistory: 1
      },
    };
    await gadgets.updateOne(filter, removelast);    

    const updateDoc = {
      $set: {
        sincelastbrew: prevbrewingtime
      },
    };
    await gadgets.updateOne(filter, updateDoc);    




  }




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