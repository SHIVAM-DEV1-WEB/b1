import jwt from "jsonwebtoken";
import {apierror} from "../utils/apierror.js";
import {asynchandler} from "../utils/asynchandeler.js";


export const verifyJwt = asynchandler(async(req , res , next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", ""); 


    if(!token){
        throw  new apierror(401,"Unauthorised-token missing");
    }

//decode the token
    try {
        const decodedToken =jwt.verify(token ,process.env.JWT_ACCESS_TOKEN_SECRET);
        
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new apierror(401,error?.message || "INVALID");
    }
})