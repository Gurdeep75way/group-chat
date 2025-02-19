import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types";

interface GroupState {
    selectedGroupId: string | null;
    messages: IMessage[];
}

const initialState: GroupState = {
    selectedGroupId: null,
    messages: [],
};

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        selectGroup: (state, action: PayloadAction<string>) => {
            state.selectedGroupId = action.payload;
            state.messages = []; // Reset messages when switching groups
        },
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        clearGroup: (state) => {
            state.selectedGroupId = null;
            state.messages = [];
        },
    },
});

export const { selectGroup, setMessages, addMessage, clearGroup } = groupSlice.actions;
export default groupSlice.reducer;
