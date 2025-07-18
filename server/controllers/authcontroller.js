import bcrypt from 'bcryptjs';
import jwt from 'JsonWebToken';
import JSONTransport from 'nodemailer/lib/json-transport';
import { JsonWebTokenError } from 'Jsonwebtoken';
import userModel from '../models/userModel';
export const register = async (req,res)=>{
    const {name,email,password}= req.body;
    if (!name || !email || !password){
        return res.json({success:false,message : "missing details"}) 
    }
    try {
        const existinguser= await userModel.findOne({email})
        if(existinguser){
            return res.json({ success: false,message:"user already exists"});
        }
      const hashedpassword = await bcrypt.hashed(password,10);  
      const user = new userModel({name,email,password:hashedpassword});
      await user.save();

      const token = jwt.sign({id: user_id}, process.env.JWT_SECRET,{ expiresIn:'7d'});
      res.cookie('token', token {
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        maxAge: 7*24*60*60*1000
      });
    } catch (error) {
        res.json({success:false,message: error.message})
    }

}
export const login = async (req,res)=> {
    const {email,password}= req.body;
    if(!email || !password){
        return res.json({success:false, message:'email or password are required'})
    }
    try {
        const user= await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,message:'invalid email'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({
                success:false, message:'invalid password'
            })
        }
         const token = jwt.sign({id: user_id}, process.env.JWT_SECRET,{ expiresIn:'7d'});
      res.cookie('token', token {
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        maxAge: 7*24*60*60*1000
      });

    
    } catch (error) {
        return res.json({
            success:false,message:error.message
        });
    };
}