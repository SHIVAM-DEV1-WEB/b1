import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import{
    createCall,
        callOffer,
        getAnswer,
        sendAnswer,
        getice,
        sendIce
}from "../controllers/user.controllers.js";

const router = Router();


router.post("/createcall",verifyJwt,createCall);
router.get("/offer/:callId",verifyJwt,callOffer);
router.post("/answer",sendAnswer);
router.get("/answer/:callId",getAnswer);
router.post("/ice-candidates",sendIce);
router.get("/ice-candidates/:callId",getice);

export default router;