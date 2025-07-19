import jwt from "jsonwebtoken";

const userauth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.user = { id: decoded.id }; // attach user id to req.user
      next();
    } else {
      return res.json({ success: false, message: "Login again" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userauth;
