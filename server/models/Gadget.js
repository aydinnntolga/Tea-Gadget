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
    countdown:{
        type:Date,
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
        type:Date,
        required: true,

    },
    brewinaday:{
        type: Array,
        required:true,
        default: []
    }

});

export default mongoose.model("Gadget",gadgetSchema);