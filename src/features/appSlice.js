import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    chatId: null,
    chatName: null
  },
  reducers: {
    setChatInfo: (state, action) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    }
  }
});

export const { setChatInfo } = appSlice.actions;

export const selectChatId = state => state.app.chatId;
export const selectChatName = state => state.app.chatName;

export default appSlice.reducer;
