import mongoose from "mongoose";
import { type IUser } from "./user.dto";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const Schema = mongoose.Schema;

const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
};


const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    groupsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    groupsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],

}, { timestamps: true });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Hash only if modified

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});


export default mongoose.model<IUser>("User", UserSchema);