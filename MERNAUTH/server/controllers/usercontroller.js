import userModel  from "../models/userModel.js";   
import { isAuthenticated } from "./authcontroller.js";
export const getuserdata = async (req, res) => {
    try {
        const  userid  = req.user.id;
        const user = await userModel.findById(userid);
        if (!user) {
            return res.json({ success: false, message: 'user not found' })
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
