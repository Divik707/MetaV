import { Request, Response, Router } from "express";
import { registerSchema, loginSchema } from "@repo/schema/schema";
import { prismaClient } from "@repo/database/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/common";
import bcrypt from "bcrypt";

const router = Router();

export const register: Router = router.post("/register", async(req: Request, res: Response) => {
    try {
        const parsedSignin = registerSchema.safeParse(req.body);
        if(!parsedSignin.success) { 
            console.log(parsedSignin.error);
            return res.status(400).json({
                message: "Invalid signin data",
            })
        
        }
        else {
            const { username, password, role } = parsedSignin.data;
            const userExist = await prismaClient.user.findFirst({
                where: {
                    username: username as string
                }
            })
            if(userExist) {
                return res.status(400).json({
                    message: "User already exists",
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await prismaClient.user.create({
                    data: {
                        username: username as string,
                        password: hashedPassword,
                        role: role as any
                    }
                })
                return res.status(201).json({
                    message: "User created successfully",
                    user: `${user.username} created as ${user.role}`,
                }) 
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

export const login: Router = router.post("/login", async(req: Request, res: Response) => {
    try {
        const parsedLogin = loginSchema.safeParse(req.body);
        if(!parsedLogin.success) {
            return res.status(400).json({
                message: "Invalid login data",
            })
        }
        else {
            const { username, password } = parsedLogin.data;
            const userSigned = await prismaClient.user.findFirst({
                where: {
                    username: username as string
                }
            })
            if(!userSigned) {
                return res.status(400).json({
                    message: "User not found",
                })
            }
            else {
                const isPasswordValid = await bcrypt.compare(password, userSigned.password);
                if(!isPasswordValid) {
                    return res.status(400).json({
                        message: "Invalid password",
                    })
                }
                else {
                    const token = jwt.sign({
                        id: userSigned.id,
                    }, JWT_SECRET as string, {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Login successful",
                        token: token,
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

