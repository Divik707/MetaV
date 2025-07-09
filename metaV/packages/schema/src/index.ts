import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
    role: z.enum(["Admin", "User"]).default("User"),    
})


export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
})