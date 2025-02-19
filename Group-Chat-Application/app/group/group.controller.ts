import { Request, Response, NextFunction } from "express";
import * as groupService from "./group.service";
import createHttpError from "http-errors";
import { IUser } from "../user/user.dto";
import mongoose from "mongoose";
import groupSchema from "./group.schema";
import expressAsyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;
        console.log(user); // The user info from the JWT token


        const groupData = {
            ...req.body,
            admin: user._id  // Use the user ID from the token
        };

        const group = await groupService.createGroup(groupData);
        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        next(error);
    }
};


export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("hello");
        const user = req.user as IUser;
        console.log("Hello")
        const { id } = req.params;
        console.log(user);
        console.log(id);
        const group = await groupService.getGroupById(id, user._id.toString());
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
};

export const joinGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;
        if (!user || !user._id) {
            throw createHttpError(401, "Unauthorized: User not found");
        }

        const { groupId } = req.body;
        await groupService.joinGroup(groupId, new mongoose.Types.ObjectId(user._id));

        const group = await groupSchema.findById(groupId);
        if (group?.isPublic) {
            res.status(200).json({ message: "Successfully joined group" });
        }
        else {
            res.status(200).json({ message: "You have requested to join the group. Wait for admin approval." });
        }
    } catch (error) {
        next(error);
    }
};

export const inviteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;
        if (!user || !user._id) {
            throw createHttpError(401, "Unauthorized: User not found");
        }

        const { groupId, userId } = req.body;
        await groupService.inviteUser(groupId, user._id.toString(), new mongoose.Types.ObjectId(userId));

        res.status(200).json({ message: "User invited successfully" });
    } catch (error) {
        next(error);
    }
};
export const getAllGroups = expressAsyncHandler(async (_req: Request, res: Response) => {
    const result = await groupService.getAllGroups();
    res.send(createResponse(result));
});

export const getUserCreatedGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser;
        console.log(user);
        if (!user || !user._id) {
            throw createHttpError(401, "Unauthorized: User not found");
        }

        const groups = await groupService.getUserCreatedGroups(user._id.toString());

        res.status(200).json({ groups });
    } catch (error) {
        next(error);
    }
};


export const respondToInvitation = async (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (!user || !user._id) {
        throw createHttpError(401, "Unauthorized: User not found");
    }

    const { groupId, action } = req.body;
    const userId = new mongoose.Types.ObjectId(user._id);
    const group = await groupSchema.findById(groupId);
    if (!group) throw createHttpError(404, "Group not found");

    if (!group.invitations.some(id => id.equals(userId))) {
        throw createHttpError(400, "You have not been invited to this group");
    }

    if (action === "accept") {
        group.participants.push(userId);
        group.invitations = group.invitations.filter(id => !id.equals(userId));
        await group.save();
        return res.status(200).json({ message: "Successfully joined the group" });
    } else if (action === "reject") {
        group.invitations = group.invitations.filter(id => !id.equals(userId));
        await group.save();
        return res.status(200).json({ message: "Invitation rejected" });
    } else {
        throw createHttpError(400, "Invalid action");
    }
};


export const getUserInvitations = async (req: Request, res: Response) => {
    try {
        const userId = req?.user?._id;
        if (!userId) {
            return res.status(400).json({ message: "Unauthorized request" });
        }

        const invitations = await groupSchema
            .find({ invitations: { $in: [userId] } })
            .populate("admin", "_id") // Populate the admin (sender)
            .select("name _id admin");

        if (!invitations.length) {
            return res.status(200).json({ message: "No invitations found", data: [] });
        }

        const formattedInvitations = invitations.map((group) => ({
            _id: group._id,
            groupId: group._id,
            senderId: group.admin?._id, // Admin is the sender
            receiverId: userId, // Current user is the receiver
            status: "pending" // Default status
        }));

        res.status(200).json({ data: formattedInvitations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const approveRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = req.user as IUser;
        if (!admin || !admin._id) {
            throw createHttpError(401, "Unauthorized: User not found");
        }

        const { groupId, userId } = req.body; // Get userId from request body

        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw createHttpError(400, "Invalid groupId or userId");
        }

        await groupService.approveRequest(
            new mongoose.Types.ObjectId(groupId), // Convert to ObjectId
            new mongoose.Types.ObjectId(userId), // Convert to ObjectId
            admin.id.toString() // Convert to string
        );

        res.status(200).json({ message: "User request approved" });
    } catch (error) {
        next(error);
    }
};


export const rejectRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = req.user as IUser;
        if (!admin || !admin._id) {
            throw createHttpError(401, "Unauthorized: User not found");
        }

        const { groupId, userId } = req.body; // Get userId from request body

        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
            throw createHttpError(400, "Invalid groupId or userId");
        }
        await groupService.rejectRequest(
            new mongoose.Types.ObjectId(groupId), // Convert to ObjectId
            new mongoose.Types.ObjectId(userId), // Convert to ObjectId
            admin.id.toString() // Convert to string
        );

        res.status(200).json({ message: "User request rejected" });
    } catch (error) {
        next(error);
    }
};
export const updateGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedGroup = await groupSchema.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(updatedGroup);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Delete Group
export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedGroup = await groupSchema.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}