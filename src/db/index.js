import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async() =>{
try {
    const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log(`\n mongodb connected!!DB host:${connectionInstance.connection.host}`);
     
} catch (error) {
    console.log("mongoDb connection error",error);
    process.exit(1);
}

}
console.log("DB module loaded successfully!");


export default connectDB