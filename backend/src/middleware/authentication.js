import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // attaches { userId, email } to the request
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
