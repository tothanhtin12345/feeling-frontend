import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  loading: false,
  skip: 0,
  canLoad: true,

  //giá trị _id của phòng được chọn khi ở trang messages
  singleConversationId: null,
};

const messagesWindowSlice = createSlice({
  name: "messagesWindow",
  initialState,
  reducers: {
    fetchConversationsSaga: (state, action) => {
      state.loading = true;
    },
    fetchConversations: (state, action) => {
      state.conversations = [...state.conversations, ...action.payload];
      state.loading = false;
    },
    //thêm một conversation - sẽ xảy ra
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);

      //tăng skip
      state.skip += 1;
    },
    readConversation: (state, action) => {
      const editConversation = action.payload;
      const converIndex = state.conversations.findIndex(
        (item) => item._id === editConversation._id
      );
      if (converIndex >= 0) {
        state.conversations[converIndex] = {
          ...state.conversations[converIndex],
          ...editConversation,
        };
      }
    },
    //update một conversation - dành cho up một lượng lớn dữ liệu
    updateConversation: (state, action) => {
      const editConversation = action.payload;
      const converIndex = state.conversations.findIndex(
        (item) => item._id === editConversation._id
      );
      //nếu có thì thực hiện update - và đưa cái thằng mới update này lên đỉnh mảng
      if (converIndex >= 0) {
        let currentConversation = state.conversations[converIndex];
        currentConversation = {
          ...currentConversation,
          ...editConversation,
        };
        //xóa ở vị trí hiện tại
        state.conversations.splice(converIndex, 1);
        //thêm lên đỉnh mảng
        state.conversations.unshift(currentConversation);
      }
      //nếu chưa thì thêm mới vào đỉnh mảng và tăng skip
      else {
        state.conversations.unshift(editConversation);

        //tăng skip
        state.skip += 1;
      }
    },

    deleteConversation: (state, action) => {
      const conversationId = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conversationId
      );
      if (conversationIndex >= 0) {
        state.conversations.splice(conversationIndex, 1);
        //giảm skip
        if (state.skip > 0) {
          state.skip -= 1;
        }
      }
    },

    //thêm _id của conversation được chọn - sẽ có nếu người dùng chọn nhấn chọn một conversation ở trang messages
    setSingleConversationId: (state, action) => {
      const conversationId = action.payload;

      //nếu chưa chọn thì mới chọn
      if (state.singleConversationId !== conversationId) {
        state.singleConversationId = conversationId;
      }
    },

    setMessagesWindowLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessagesWindowCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changeMessagesWindowSkip: (state, action) => {
      state.skip += action.payload;
    },
  },
});

export const {
  fetchConversationsSaga,
  fetchConversations,
  updateConversation,
  addConversation,
  deleteConversation,
  setMessagesWindowLoading,
  setMessagesWindowCanLoad,
  changeMessagesWindowSkip,
  readConversation,
  setSingleConversationId,
} = messagesWindowSlice.actions;

export default messagesWindowSlice.reducer;
