import mongoose, { Schema } from "mongoose";


const videoCallSchema = new Schema({
    callId:{
        type:String,
        required:true
    },
    offer:{
        type:Object
    },
    answer:{
        type:Object
    },
    iceCandidates:[Object]

});


export const USER = mongoose.model("USER",videoCallSchema)