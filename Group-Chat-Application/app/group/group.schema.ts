import mongoose from "mongoose";
import { type IGroup } from "./group.dto";

const Schema = mongoose.Schema;

const GroupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    description: { type: String },
    isPublic: { type: Boolean, default: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Track invited users
}, { timestamps: true });

export default mongoose.model<IGroup>("Group", GroupSchema);


