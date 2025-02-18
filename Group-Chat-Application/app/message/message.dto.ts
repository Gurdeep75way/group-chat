import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IMessage extends BaseSchema {
    sender: mongoose.Types.ObjectId;
    recipient?: mongoose.Types.ObjectId; // Personal message ke liye
    group?: mongoose.Types.ObjectId; // Group message ke liye
    content: string;
}
