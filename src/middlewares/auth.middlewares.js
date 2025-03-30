import jwt from "jsonwebtoken";
import {apierror} from "../utils/apierror.js";
import {asynchandler} from "../utils/asynchandeler.js";


export const verifyJwt = asynchandler(async(req , res , next)=>{
    const token = req.header("Authorization")?.replace("bearer","")


    if(!token){
        throw  new apierror(401,"Unauthorised");
    }

//decode the token
    try {
        const decodedToken =jwt.verify(token ,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        throw new apierror(401,error?.message || "INVALID");
    }
})