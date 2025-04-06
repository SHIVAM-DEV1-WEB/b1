import express from "express"
import cors from "cors"
import {createServer} from "http";
import { WebSocketServer } from "ws";
import  dotenv  from "dotenv";
dotenv.config({
    path:"./.env"
}
);


const app =express()
const server= createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
})
)

//websocket server
const wss = new WebSocketServer({server});

const rooms = new Map();

wss.on("connection",(ws) =>{
    console.log("New Web socket server ");
    

       ws.on("message",(message)=>{
        try{
        const data = JSON.parse(message);

        if(data.type === "join-room"){
            const {roomId}= data;
            if(!rooms.has(roomId)){
                rooms.set(roomId,new Set());
            }
            rooms.get(roomId).add(ws);
            console.log(`user joined room ${roomId}`);
            
        }

        if(data.type === "send-offer"){
            const {roomId,offer} =data;
            broadCasteToRoom(roomId,JSON.stringify({type:"receive-offer",offer}));
        }

        if(data.type === "send-ice"){
            const{roomId,candidate} = data;
            broadCasteToRoom(roomId,JSON.stringify({type:"receive-ice",candidate}));

        }

        if(data.type === "send-answer"){
            const {roomId,answer}=data;
            broadCasteToRoom(roomId,JSON.stringify({type:"receive-answer",answer}));
        }
    }catch(error){
        console.error(" Error processing message:", error);
    }
       });
       
       
       ws.on("close",()=>{
        console.log("Websocket disconnected");
        removeFromRooms(ws);
        
       });

       ws.on("error",(error)=>{
        console.error("websocket error:",error);
       });
    });



    function broadCasteToRoom (roomId,message){
        if(rooms.has(roomId)){
            rooms.get(roomId).forEach((client) => {
                if(client.readyState === 1){
                    client.send(message);
                }
            });
        }
    }


    function removeFromRooms(ws){
        rooms.forEach((clients,roomId)=>{
            clients.delete(ws);
            if(clients.size === 0){
                rooms.delete(roomId);
            }
        });
    }




import router from "./routes/videocall.routes.js";



app.use("/api/v1/videocall",router);


export {app,server};
