import express from "express"
import cors from "cors"
import {createServer} from "http";
import { Server } from "socket.io";


const app =express()

// create http server
 const server = createServer(app);

//setup soketio
const io = new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN,
        credentials:true
}
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
})
)

app.use((req,res,next)=>{
    req.io = io;
    next();
})

import router from "./routes/videocall.routes.js";
import { Socket } from "dgram";
app.use("/api/v1/videocall",router);

// logic for singalling
io.on("Connection",(Socket)=>{
    console.log(`user connected:${Socket.id}`);


Socket.on("join-room",(roomId)=>{
    Socket.join(roomId);
    console.log(`user joined room${roomId}`);
    
})

Socket.on("disconnected",()=>{
    console.log(`user disconnected:${Socket.id}`);
    
});
});

export {app,server,io};
