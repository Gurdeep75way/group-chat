import { body } from "express-validator";

export const sendMessage = [
    body("sender").notEmpty().withMessage("Sender is required").isMongoId().withMessage("Invalid sender ID"),
    body("content").notEmpty().withMessage("Message content is required"),
    body("recipient").optional().isMongoId().withMessage("Invalid recipient ID"),
    body("group").optional().isMongoId().withMessage("Invalid group ID"),
    body().custom((value, { req }) => {
        if (!req.body.recipient && !req.body.group) {
            throw new Error("Either recipient or group is required");
        }
        return true;
    })
];
