
import { apierror } from "../utils/apierror.js";

import { USER } from "../models/videocall.model.js";


//how to create tokens

const genrateAcessandrefrshToken = async(userId)=>{
//select user by his id
try {
    const user = await USER.findById(userId)
    if(!user){
        throw new apierror(400,"user not found")
    }

    const acessToken =user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})
    return {acessToken,refreshToken}
} catch (error) {
    throw new apierror(400,"something went wrong while generating tokens");
}
}

