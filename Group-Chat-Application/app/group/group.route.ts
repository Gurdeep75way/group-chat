import { Router } from "express";
import * as groupController from "./group.controller";
import * as groupValidator from "./group.validation";
import { catchError } from "../common/middleware/cath-error.middleware";
import { isGroupAdmin, verifyToken } from "../common/middleware/role-auth.middleware";
// import passport from "passport";

const router = Router();

router.get("/", groupController.getAllGroups);

router.get("/my-groups", verifyToken, groupController.getUserCreatedGroups);

router.post("/join", groupValidator.joinGroup, verifyToken, catchError, groupController.joinGroup);

router.get("/invitations", verifyToken, catchError, groupController.getUserInvitations);

router.post("/respond-to-invitations", groupValidator.respondInvitation, verifyToken, catchError, groupController.respondToInvitation);


router.post("/create", groupValidator.createGroup, verifyToken, groupController.createGroup);

router.post("/invite", verifyToken, groupValidator.inviteUser, catchError, groupController.inviteUser);

router.post("/approve", verifyToken, groupValidator.approveRequest, catchError, groupController.approveRequest);

router.post("/reject", verifyToken, groupValidator.approveRequest, catchError, groupController.rejectRequest);


router.get("/:id", verifyToken, groupController.getGroupById);

router.put("/:id", verifyToken, groupController.updateGroup);

router.delete("/:id", verifyToken, groupController.deleteGroup);

export default router;
