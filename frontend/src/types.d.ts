declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // Added for the password field
  active: boolean;
  role: "USER" | "ADMIN";
  groupsCreated: string[]; // Array of Group ObjectIds
  groupsJoined: string[]; // Array of Group ObjectIds
}

interface Invitation {
  _id: string;
  groupId: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "rejected";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface IMessage {
  _id: string;
  sender: string; // User ObjectId
  recipient?: string; // User ObjectId, optional for group messages
  group?: string; // Group ObjectId, optional for 1-on-1 messages
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface IGroup {
  _id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  admin: string; // User ObjectId
  participants: string[]; // Array of User ObjectIds
  requests: string[]; // Array of User ObjectIds
  invitations: string[]; // Array of User ObjectIds
  createdAt: string;
  updatedAt: string;
}
