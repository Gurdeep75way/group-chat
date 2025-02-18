import { type IGroup } from "./group.dto";
import GroupSchema from "./group.schema";
import UserSchema from "../user/user.schema";
import mongoose from "mongoose";
import createHttpError from "http-errors";
// import groupSchema from "./group.schema";

export const createGroup = async (data: IGroup) => {
    const group = await GroupSchema.create(data);
    await UserSchema.findByIdAndUpdate(data.admin, { $push: { groupsCreated: group._id } });
    return group;
};

export const getGroupById = async (id: string, userId: string) => {
    const group = await GroupSchema.findById(id)
        .populate("participants")
        .populate("requests")
        .lean();

    if (!group) throw createHttpError(404, "Group not found");
    if (group.admin.toString() !== userId) throw createHttpError(403, "Only admins can view this group");

    return group;
};
export const joinGroup = async (groupId: string, userId: mongoose.Types.ObjectId) => {
    const group = await GroupSchema.findById(groupId);
    if (!group) throw createHttpError(404, "Group not found");

    if (group.admin.equals(userId)) {
        throw createHttpError(400, "Admin cannot join as a regular user");
    }

    if (group.isPublic) {
        // Directly add to participants in public groups
        if (group.participants.includes(userId)) {
            throw createHttpError(400, "You are already a member");
        }
        group.participants.push(userId);
    } else {
        // In private groups, move to request array for admin approval
        if (group.requests.includes(userId)) {
            throw createHttpError(400, "Join request already sent");
        }
        group.requests.push(userId);
    }

    await group.save();
};


export const getUserCreatedGroups = async (adminId: string) => {
    const groups = await GroupSchema.find({ admin: adminId }).select("_id name description participants");

    if (!groups.length) {
        throw createHttpError(404, "You haven't created any groups");
    }

    return groups;
};


export const getAllGroups = async () => {
    return await GroupSchema.find().lean();
};

export const inviteUser = async (groupId: string, adminId: string, userId: mongoose.Types.ObjectId) => {
    const group = await GroupSchema.findById(groupId);
    if (!group) throw createHttpError(404, "Group not found");
    if (group.admin.toString() !== adminId) throw createHttpError(403, "Only admins can send invitations");

    if (group.isPublic) {
        // Directly add the user to participants in public groups
        if (group.participants.includes(userId)) {
            throw createHttpError(400, "User is already a member");
        }
        group.participants.push(userId);
    } else {
        // Send an invitation in private groups
        if (group.invitations.includes(userId)) {
            throw createHttpError(400, "User is already invited");
        }
        group.invitations.push(userId);
    }

    await group.save();
};


export const approveRequest = async (groupId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, adminId: string) => {
    const group = await GroupSchema.findById(groupId);
    if (!group) throw createHttpError(404, "Group not found");

    if (group.admin.toString() !== adminId) { // Ensure adminId is string
        throw createHttpError(403, "Only admins can approve requests");
    }

    const index = group.requests.findIndex((requestId) => requestId.equals(userId));

    console.log("Index found:", index);
    console.log("Group requests:", group.requests);
    console.log("UserId being checked:", userId);
    group.requests.splice(index, 1);
    group.participants.push(userId);
    await group.save();

};
export const rejectRequest = async (groupId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, adminId: string) => {
    const group = await GroupSchema.findById(groupId);
    if (!group) throw createHttpError(404, "Group not found");

    if (group.admin.toString() !== adminId) { // Ensure adminId is string
        throw createHttpError(403, "Only admins can approve requests");
    }

    const index = group.requests.findIndex((requestId) => requestId.equals(userId));

    console.log("Index found:", index);
    console.log("Group requests:", group.requests);
    console.log("UserId being checked:", userId);
    group.requests.splice(index, 1);
    await group.save();

};

