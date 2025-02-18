import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
    name: string;
    email: string;
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    generateJWT: () => string;
    active?: boolean;
    role: "USER" | "ADMIN";
    groupsCreated: string[]; // Groups where user is admin
    groupsJoined: string[];  // Groups where user is a member
    id: string
}

