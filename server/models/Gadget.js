import mongoose from "mongoose";

const gadgetSchema = new mongoose.Schema({
    room_number:{
        type: Number,
        required: true,
    },
    faculty_name:{
        type:String,
        required:true,
    },
    cauldron_status:{
        type: String,
        required: true,
    },
    cupstaken:{
        type: Array,
        required: true,
        default: []
    },
    cauldron_full:{
        type: Number,
        required: true,
        default: 0
    },
    heat_level:{
        type:Number,
        required:true,
    },
    sincelastbrew:{
        type:String,
        required: true,

    },
    brewhistory:{
        type: Array,
        required:true,
        default: []
    },
    floor:{
        type: Number,
        required:true,
        default:0
    },
    roomId:{
        type:String,
        required: true
    },
    drinks:{
        type:Array,
        required:true,
        default: []
    }

});

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    }
});

const TeaGadget = mongoose.model("TeaGadget", gadgetSchema);
const User = mongoose.model("User", userSchema);

export { TeaGadget, User };