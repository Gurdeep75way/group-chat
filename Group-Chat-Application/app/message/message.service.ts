import MessageSchema from "./message.schema";
import { type IMessage } from "./message.dto";

export const sendMessage = async (data: IMessage) => {
    const message = await MessageSchema.create(data);
    return message;
};

export const getMessagesForUser = async (userId: string) => {
    const messages = await MessageSchema.find({
        $or: [{ sender: userId }, { recipient: userId }]
    }).populate("sender recipient group");
    return messages;
};

export const getMessagesForGroup = async (groupId: string) => {
    const messages = await MessageSchema.find({ group: groupId }).populate("sender group");
    return messages;
};
