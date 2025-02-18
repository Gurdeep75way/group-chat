import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IGroup extends BaseSchema {
    name: string;
    description?: string;
    isPublic: boolean;
    admin: mongoose.Types.ObjectId; // Remove | string
    participants: mongoose.Types.ObjectId[]; // Remove | string[]
    requests: mongoose.Types.ObjectId[];
    invitations: mongoose.Types.ObjectId[] // Remove | string[]
}
