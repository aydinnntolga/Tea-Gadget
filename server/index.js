  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import { MongoClient } from "mongodb";
  import CASAuthentication from 'cas-authentication';
  import session from 'express-session'; 
  import cors from 'cors';

  

  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); 

  app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: 'GET,POST,PUT,DELETE' 
  }));

  app.use(session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: true
  }));



  const cas = new CASAuthentication({
    cas_url: 'https://login.sabanciuniv.edu/cas',
    service_url: 'http://192.168.1.38:3000/admin',
    cas_version: '3.0',
    session_name: 'cas_user',
    renew: false,
    is_dev_mode: false,
    session_info: 'cas_userinfo',
    destroy_session: true,
    logout: true
  });


  const uri = process.env.MONGO; 
  const client = new MongoClient(uri);
  const database = client.db("TeaGadget");
  const gadgets = database.collection("TeaGadget");
  const users = database.collection("Users");

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


  const allowedUsers = ['dd'];

  app.get('/admin', cas.bounce, (req, res) => {

    const username = req.session.cas_user;
  
    if (allowedUsers.includes(username)) {
      res.redirect('/admin?ticket=ST-100939-5e5MxcsbR9RuXf-C57tU6w5k4i8-login'); 
    } else {
      res.redirect('/');
    }
  });

  app.get("/roomsData",async(req,res) => {
    console.log("hi")
    gadgets.find().toArray()
    .then(data => {
        res.json(data);
    })
    
  });


  app.post("/usersearch", async (req, res) => {
    const {username} = req.body;
    try{
      const user = await users.findOne({ username: username });
      if (user) {
        res.status(200).send("Kullanıcı bulundu");
      }
      else{
        res.send("Kullanıcı bulunamadı");
      }
    } catch (e) {
      console.error("Bir hata oluştu: ", e);
      res.status(500).send("Sunucu bulunamadı");
    }
  });


  app.get('/api/userinfo', cas.bounce, (req, res) => {
    if (req.session.cas_user) {
      res.json({ username: req.session.cas_user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

app.post("/updatelastbrew", async (req, res) => {
    const roomId = req.headers['id'];
    const drinkname = req.headers['drinkname'];

    console.log(roomId, drinkname);

    const filter = {roomId,"drinks.drink_name": drinkname};
    const currentdate = new Date();
    const updateddate = currentdate.toLocaleString()
    const updateDoc = {
      $set: {
        "drinks.$.sincelastbrew": updateddate,
        "drinks.$.cauldron_status": "nonempty" 
      },
      $push: {
        "drinks.$.brewhistory": updateddate
      }

      };
      const result = await gadgets.updateOne(filter, updateDoc);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
      res.redirect("/");
  });

app.post("/tearanout", async (req,res)=>{
  const roomId = req.headers['id'];
  const drinkname = req.headers['drinkname'];

  const filter = {roomId,"drinks.drink_name": drinkname};

  const updateDoc = {
    $set: {
      "drinks.$.cauldron_status": "empty" 
    },
  };
  const result = await gadgets.updateOne(filter, updateDoc);
  console.log(
    `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  );
  res.redirect("/");  

})

app.post("/addnewdrink", async (req,res)=>{

  const roomId = req.headers['id'];
  const drinkname = req.headers['drinkname'];
  const prepTime = parseInt(req.headers['preptime']);

  console.log(drinkname,prepTime);

  const newDrink = { drink_name: drinkname, prep_time: prepTime , sincelastbrew: "", brewhistory: new Array(), cauldron_status:"empty"};
  const filter = {roomId: roomId};
  const updateDoc = {
    $push: {
      drinks: newDrink
    }
  };
  const result = await gadgets.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.redirect("/");
})

app.post("/deletedrink", async (req,res)=>{

  const roomId = req.headers['id'];
  const drinkNameToRemove = req.headers['drinkname'];

  const filter = {roomId: roomId};

  const updateDoc = {
     $pull: { drinks: { drink_name: drinkNameToRemove } } 
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

app.get("/tablet-interface/:roomid",async(req,res) => {

  const searchString = req.params.roomid.substring(1);

  gadgets.find({roomId: searchString}).toArray()
  .then(data => {
      console.log(data.length);
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

  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('https://login.sabanciuniv.edu/cas/logout');
    });
  });