import { Router } from "express";
import{
    createCall,
        callOffer,
        getAnswer,
        sendAnswer,
        getice,
        sendIce
}from "../controllers/user.controllers.js";

const router = Router();


router.post("/createcall",createCall);
router.get("/offer/:callId",callOffer);
router.post("/answer",sendAnswer);
router.get("/answer/:callId",getAnswer);
router.post("/ice-candidates",sendIce);
router.get("/ice-candidates/:callId",getice);

export default router;