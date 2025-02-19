import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types";
interface UserState {
    selectedUserId: string | null;
    messages: IMessage[] // Stores messages per user ID
}

const initialState: UserState = {
    selectedUserId: null,
    messages: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<string>) => {
            state.selectedUserId = action.payload;
            state.messages = [];
        },
        clearUser: (state) => {
            state.selectedUserId = null;
            state.messages = [];
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
    },
});

export const { selectUser, clearUser, addMessage, setMessages } = userSlice.actions;
export default userSlice.reducer;
