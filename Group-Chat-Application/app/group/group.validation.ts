import { body } from "express-validator";

export const createGroup = [
    body("name").notEmpty().withMessage("Group name is required").isString(),
    body("isPublic").optional().isBoolean()
];

export const joinGroup = [
    body("groupId").notEmpty().withMessage("Group ID is required").isString()
];

export const approveRequest = [
    body("groupId").notEmpty().withMessage("Group ID is required").isString(),
    body("userId").notEmpty().withMessage("User ID is required").isMongoId()
];

export const inviteUser = [
    body("groupId").notEmpty().withMessage("Group ID is required").isString(),
    body("userId").notEmpty().withMessage("User ID is required").isMongoId()
];

export const respondInvitation = [
    body("groupId").notEmpty().withMessage("Group ID is required").isString(),
    body("action").notEmpty().withMessage("Action is required").isString().isIn(["accept", "reject"]),

];