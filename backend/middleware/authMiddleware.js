import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // console.log("HERE: "+req.headers.authorization)
  // console.log("Headers:", req.headers); // Debugging log
  // console.log("Cookies:", req.cookies); // Debugging log

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // console.log("JWT_SECRET (authMiddleware):", process.env.JWT_SECRET); // Log the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded); // Debugging log

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    next();
  } catch (error) {
    console.error("Failed to authenticate token:", error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export default authMiddleware;
