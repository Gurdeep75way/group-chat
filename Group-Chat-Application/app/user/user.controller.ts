
import { createResponse } from "../common/helper/response.hepler";
import * as userService from "./user.service";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { createUserTokens } from "../common/services/passport-jwt.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.send(createResponse(result, "User created successfully"));
});

export const getme = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.user?._id!);
    res.send(createResponse(result));
});
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params?.id!);
    res.send(createResponse(result));
});

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const result = await userService.getAllUsers();
    res.send(createResponse(result));
});
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.user?._id!);
    res.send(createResponse(result, "User deleted sucssefully"))
});
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.user?._id!, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.user?._id!, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

// export const loginUser = asyncHandler(async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     const result = await userService.loginUser(email, password, res);
//     res.send(createResponse(result, "Login successful"));
// });
// export const logout = asyncHandler(async (req: Request, res: Response) => {
//     const user = req.user;
//     res.send(createResponse({}))
// });
export const login = asyncHandler(async (req: Request, res: Response) => {
    const tokens = createUserTokens(req.user!)
    res.send(createResponse(tokens))
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    // To do: Remove session
    res.send(createResponse({}))
});
