import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Group Chat API Documentation",
            version: "1.0.0",
            description: "API documentation for the Group Chat Application",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "User ID" },
                        name: { type: "string", description: "User's full name" },
                        email: { type: "string", description: "User's email address" },
                        password: { type: "string", description: "User's hashed password" },
                        active: { type: "boolean", description: "Account status" },
                        role: { type: "string", enum: ["USER", "ADMIN"], description: "User role" },
                        groupsCreated: {
                            type: "array",
                            items: { type: "string" },
                            description: "Groups created by the user"
                        },
                        groupsJoined: {
                            type: "array",
                            items: { type: "string" },
                            description: "Groups the user has joined"
                        },
                        createdAt: { type: "string", format: "date-time", description: "Timestamp" },
                        updatedAt: { type: "string", format: "date-time", description: "Timestamp" },
                    },
                    required: ["name", "email", "password"],
                },
                Group: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string", description: "Group name" },
                        description: { type: "string", description: "Group description" },
                        isPublic: { type: "boolean", description: "Whether the group is public" },
                        admin: { type: "string", description: "Admin user ID" },
                        participants: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of participants (User IDs)"
                        },
                        requests: {
                            type: "array",
                            items: { type: "string" },
                            description: "Pending join requests"
                        },
                        invitations: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of invited users"
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    },
                    Message: {
                        type: "object",
                        properties: {
                            id: { type: "string", description: "Message ID" },
                            sender: { type: "string", description: "Sender User ID" },
                            recipient: { type: "string", nullable: true, description: "Recipient User ID (for 1-on-1 messages)" },
                            group: { type: "string", nullable: true, description: "Group ID (for group messages)" },
                            content: { type: "string", description: "Message content" },
                            createdAt: { type: "string", format: "date-time", description: "Timestamp" },
                            updatedAt: { type: "string", format: "date-time", description: "Timestamp" },
                        },
                        required: ["sender", "content"],
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        "./app/group/group.route.ts",
        "./app/user/user.route.ts",
        "./app/message/message.route.ts",
    ], // Paths are now correctly mapped
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerSetup = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
