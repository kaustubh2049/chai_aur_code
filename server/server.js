import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectdb from './config/mongodb.js'
import authrouter from './routes/authroutes.js'
const app = express();
const port = process.env.PORT || 4000;
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
//apu endpoints
app.get('/', (req,resp)=> resp.send("api is working"));
app.use('/api/auth', authrouter)
app.listen(port, () => console.log(`Server Started on PORT: ${port}`));
