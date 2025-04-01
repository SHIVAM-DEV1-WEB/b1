import dotenv from "dotenv"
import { server} from "./app.js";
import connectDB from "./db/index.js";



dotenv.config({
    path:"./.env"
})

const port = 8080;

connectDB()
.then(()=>{
    server.listen(port ,()=>{
       console.log(`server is running at${port}`)
    })
})
.catch((err)=>{
    console.log(`mongo db connection eroor`,err);
    
})