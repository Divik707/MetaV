import { Router, Request, Response } from "express";
import { verifyAuth, RequestWithUser } from "../lib/verifyAuth";
import { prismaClient } from "@repo/database/db";

const router = Router();

export const getElements: Router = router.get("/user/elements", verifyAuth, async(req: Request, res: Response) => {
    try {
        const element = await prismaClient.elements.findMany()
        if(!element) {
            return res.status(404).json({
                message: "Elements not found",
            })
        }
        else {
            return res.status(200).json({
                elements: element.map((e) => ({
                    id: e.id,
                    image: e.imageUrl
                }))
            })
    } }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

export const getAvatar: Router = router.get("/user/avatar", verifyAuth, async(req: Request, res: Response) => {
    try {
        const avatar = await prismaClient.avatar.findMany()
        if(!avatar) {
            return res.status(404).json({
                message: "Avatar not found",
            })
        }
        else {
            return res.status(200).json({
                avatar: avatar.map((e) => ({
                    id: e.id,
                    image: e.imageUrl
                }))
            })
    } }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})