import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import process from "process";
import { type IUser } from "../../user/user.dto";
import groupSchema from "../../group/group.schema";
interface AuthRequest extends Request {
  user?: any
}

export const roleAuth = (
  roles: IUser["role"][], // Accepts an array of allowed roles
  publicRoutes: string[] = []
) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (publicRoutes.includes(req.path)) {
      return next();
    }
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw createHttpError(401, { message: "Unauthorized: No token provided" });
    }

    try {
      const decodedUser = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as IUser;
      req.user = decodedUser;

      if (!decodedUser.role || !roles.includes(decodedUser.role)) {
        throw createHttpError(403, {
          message: `${capitalize(decodedUser.role || "User")} is not authorized to access this resource`,
        });
      }

      next();
    } catch (error) {
      throw createHttpError(401, { message: "Invalid or expired token" });
    }
  });


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(createHttpError(401, "Unauthorized: No token provided"));
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
    req.user = decodedUser;  // Add the decoded user to the request object
    next();
  } catch (error) {
    next(createHttpError(401, "Invalid or expired token"));
  }
};

// Helper function to capitalize first letter of the role
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const isGroupAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id; // Extract user ID from JWT payload
    const groupId = req.params.id || req.body.groupId; // Get group ID from request params or body
    // console.log(userId);
    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required" });
    }

    const group = await groupSchema.findById(groupId);
    const id = group?.admin.toString();
    // console.log(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.admin.toString() !== userId?.toString()) {
      return res.status(403).json({ message: "You are not the admin of this group" });
    }
    console.log(2);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    // console.log("Hello ");
    if (!authorization) {
      res.status(401).send({ message: "No token found" })
    }
    else {
      const token = authorization?.split(' ')[1];
      const secretkey = process.env.JWT_SECRET as string;
      const decode = jwt.verify(token, secretkey);
      if (!decode) {
        res.status(401).send({ message: "Error occurred" })
      }
      req.user = decode;
      console.log(1);
      next();
    }
  } catch (error) {
    next(createHttpError(401, "Unauthorized: Invalid or expired token"));
  }
};