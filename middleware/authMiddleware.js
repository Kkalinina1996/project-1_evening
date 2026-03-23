import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    
    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }