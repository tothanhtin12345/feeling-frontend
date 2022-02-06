import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMessageModalVisible: false,
  newGroupChatModalVisible: false,
  addMembersModalVisible: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleNewMessageModalVisible: (state, action) => {
      if (action.payload) {
        state.newMessageModalVisible = action.payload;
      } else {
        state.newMessageModalVisible =
          !state.newMessageModalVisible;
      }
    },
    toggleNewGroupChatModalVisible: (state, action) => {
      if (action.payload) {
        state.newGroupChatModalVisible = action.payload;
      } else {
        state.newGroupChatModalVisible =
          !state.newGroupChatModalVisible;
      }
    },
    toggleAddMembersModalVisible: (state, action) => {
      if (action.payload) {
        state.addMembersModalVisible = action.payload;
      } else {
        state.addMembersModalVisible =
          !state.addMembersModalVisible;
      }
    },
  },
});

export const {
  toggleNewGroupChatModalVisible,
  toggleNewMessageModalVisible,
  toggleAddMembersModalVisible,
} = chatSlice.actions;

export default chatSlice.reducer;