import jwt from "jasonwebtoken";
const useauth = async (req,res,next)=>{
const {token}= req.cookies;
if(!token){
    return res.json({success:false,message:'not authorized'})
}
try {
    const tokendecode = jwt.verify(token, ProcessingInstruction.env.JWT_SECRET);
} catch (error) {
    res.json({success:false,message:error.message})
}
}
export default userauth