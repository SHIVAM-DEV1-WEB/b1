import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';



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

videoCallSchema.methods.generateAccessToken = function(){
     return jwt.sign({
        _id:this._id
    },
    process.env.JWT-ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    );
    }
    
    videoCallSchema.methods.generateRefreshToken = function(){
        return jwt.sign({
            _id:this._id,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    );
}

export const USER = mongoose.model("USER",videoCallSchema)