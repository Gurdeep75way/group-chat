export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    active: boolean;
    role: "USER" | "ADMIN";
    groupsCreated: string[];
    groupsJoined: string[];
  }
  
  export interface Invitation {
    _id: string;
    groupId: string;
    senderId: string;
    receiverId: string;
    status: "pending" | "accepted" | "rejected";
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  export interface IMessage {
    _id: string;
    sender: string;
    recipient?: string;
    group?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IGroup {
    _id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    admin: string;
    participants: string[];
    requests: string[];
    invitations: string[];
    createdAt: string;
    updatedAt: string;
  }
  