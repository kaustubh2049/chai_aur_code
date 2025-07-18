import mongoose from "mongoose";
const connectdb = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("database connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/MERN-AUTH`);

};
export default connectdb;