import { asynchandler } from "../utils/asynchandeler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { USER } from "../models/videocall.model.js";
 







//create  call offer 
const createCall = asynchandler(async(req,res)=>{
    const{callId,offer } = req.body;
    console.log("Request Body:", req.body);
    
    
    let call = await USER.findOne({callId});
    if (!call) {
         call = new USER({callId,offer,iceCandidates:[]})
        
    }else{
        call.offer = offer;
    }
    await call.save();
    
    
    
    return res
    .status(201)
    .json(new apiresponse(200,call,"call create sucessfully"))
    
    })
    
    //get offer by call id
    const callOffer = asynchandler(async(req,res)=>{
        const{callId}=req.params.callId;
        console.log("Looking for callId:", callId);
        const call =await USER.findOne({callId:req.params.callId}).select("offer");
        if(call && call?.offer){
            res.json({offer:call.offer});
        }else {
            res.status(404).json({ error: "Offer not found" });
          }
    });
    
    //send answer
    const sendAnswer = asynchandler(async(req,res)=>{
     const {callId ,answer} =req.body;
     let call = await USER.findOne({callId});
     if(call){
        call.answer=answer;
        await call.save();
    
       
        
        res.json({success:true})
     } else{
        throw new apierror(404,"call not found");
     }
    })
    
    //get answer
    const getAnswer = asynchandler(async(req,res)=>{
        const call = await USER.findOne({callId:req.params.callId}).select("answer")
        if(call?.answer){
             res.json({answer:call.answer})
        }else{
            res.status(404).json({ error: "answer not found" });
        }
    })
    
    //send iceCANdidate
    const sendIce = asynchandler(async(req,res)=>{
    const{callId,candidate}=req.body;
    let call = await USER.findOneAndUpdate(
        {callId},
        {$push:{iceCandidates :candidate}},
        {new:true}
    )
    if(call){
    
        
    res.json({success:true})
    }else{
        res.status(404).json({ error: "Call not found" });
    }
    })
    
    //get icecandidate
    const getice = asynchandler(async(req,res)=>{
        const call = await USER.findOne({callId:req.params.callId}).select("iceCandidates")
        
            res.json({iceCandidates:call?.iceCandidates ||[]});
    
    })

    export{
        createCall,
        callOffer,
        getAnswer,
        sendAnswer,
        getice,
        sendIce
    } 
    