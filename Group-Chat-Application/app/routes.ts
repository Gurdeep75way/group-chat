import express from "express";
import userRoutes from "./user/user.route";
import groupRoutes from "./group/group.route";
import messageRoutes from "./message/message.route";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/groups", groupRoutes);

router.use("/message", messageRoutes);

export default router;