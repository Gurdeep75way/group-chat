import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import { Response } from "express"; // Import the Response type

// Create a new user
export const createUser = async (data: IUser): Promise<IUser> => {
    return await UserSchema.create(data);
};

// Get user by ID
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await UserSchema.findById(id).lean();
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserSchema.findOne({ email }).lean();
};

// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
    return await UserSchema.find().lean();
};

// Delete user by ID
export const deleteUser = async (id: string): Promise<{ deletedCount?: number }> => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};

// Update user by ID with full data
export const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, { new: true }).lean();
    return result;
};

// Edit user by ID with partial data
export const editUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, { new: true }).lean();
    return result;
};

// // Login user and set JWT token in cookies
// export const loginUser = async (email: string, password: string, res: Response): Promise<{ user: IUser; token: string }> => {
//     const user = await UserSchema.findOne({ email });
//     if (!user) throw new Error("Invalid email or password");

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) throw new Error("Invalid email or password");

//     const token = user.generateJWT();

//     // Set token in HTTP-only cookie
//     res.cookie('token', token, {
//         httpOnly: true, // Can't be accessed via JavaScript
//         secure: process.env.NODE_ENV === 'production', // Secure cookie in production// Helps with CSRF prevention
//         maxAge: 1000 * 60 * 60 * 24, // Cookie expiration (1 day)
//     });

//     return { user, token };
// };
