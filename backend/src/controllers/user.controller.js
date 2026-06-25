import { createUserModel } from "../models/user.model.js";
import { registerUser } from "../services/user.service.js";
import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(7),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  password: z.string().min(8),
  profileImage: z.string().optional(),
});
// asdfgh;
export async function registerUserController(req, res) {
  const parsed = UserSchema.safeParse(req.body);
  const user = createUserModel(parsed.data);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten(),
    });
  }

  try {
    const result = await registerUser(user);

    return res.status(201).json({
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
