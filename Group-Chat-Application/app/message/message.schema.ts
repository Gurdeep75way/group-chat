import mongoose from "mongoose";
import { type IMessage } from "./message.dto";

const Schema = mongoose.Schema;

const MessageSchema = new Schema<IMessage>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Only for 1-on-1 messages
        group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // Only for group messages
        content: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
