import * as messageService from "./message.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const result = await messageService.sendMessage(req.body);
    res.send(createResponse(result, "Message sent successfully"));
});

export const getMessagesForUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await messageService.getMessagesForUser(req.params.userId);
    res.send(createResponse(result, "Messages retrieved successfully"));
});

export const getMessagesForGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await messageService.getMessagesForGroup(req.params.groupId);
    res.send(createResponse(result, "Group messages retrieved successfully"));
});
