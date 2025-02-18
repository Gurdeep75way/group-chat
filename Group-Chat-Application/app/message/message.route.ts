import { Router } from "express";
import * as messageController from "./message.controller";
import * as messageValidator from "./message.validation";
import { catchError } from "../common/middleware/cath-error.middleware";

const router = Router();

router.post("/", messageValidator.sendMessage, catchError, messageController.sendMessage);

router.get("/user/:userId", messageController.getMessagesForUser);

router.get("/group/:groupId", messageController.getMessagesForGroup);

export default router;
