import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // 1. Получаем header
    const authHeader = req.headers.authorization;

    // 2. Проверяем есть ли он
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // 3. Проверяем формат Bearer TOKEN
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Token format invalid",
      });
    }

    const token = parts[1];

    // 4. Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Сохраняем пользователя
    req.user = decoded;

   
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}