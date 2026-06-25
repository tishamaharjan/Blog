import { z } from "zod";
import { loginUser } from "../services/auth.service.js";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function loginUserController(req, res, next) {
  const parsed = LoginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    const { token, user } = await loginUser(parsed.data);

    res.cookie("token", token, {
      httpOnly: true, // JS can't read this — protects against XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, match JWT_EXPIRES_IN
    });

    return res.status(200).json({
      message: "Login successful.",
      data: user, // never send the token in the body too — defeats httpOnly's purpose
    });
  } catch (error) {
    next(error);
  }
}

export function logoutUserController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully." });
}
