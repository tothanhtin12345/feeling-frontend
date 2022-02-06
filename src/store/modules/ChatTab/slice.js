import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //mảng giá trị _id của 2 phòng được chọn cho chức năng tab chat
  conversationIdArr: [],
};

const chatTabSlice = createSlice({
  name: "chatTab",
  initialState,
  reducers: {
    //thêm _id cho mảng conversationIdArr - dành cho chức năng tab chat
    addConversationId: (state, action) => {
      const conversationId = action.payload;
      //nếu trong mảng đã có giá trị muốn thêm thì không làm gì cả
      if (state.conversationIdArr.includes(conversationId)) return;

      //thực hiện push nếu độ dài của mảng <=1 có 0 hoặc 1 phần tử
      if (state.conversationIdArr.length <= 1) {
        state.conversationIdArr.push(conversationId);
      }
      //ngược lại thì thay thế cái ở vị trí đầu mảng thành cái mới
      //và cái vị thứ thì thay bằng cái vị trí đầu
      else {
        state.conversationIdArr[1] = state.conversationIdArr[0];
        state.conversationIdArr[0] = conversationId;
      }
    },

    //thêm _id cho mảng conversationIdArr nhưng mà là dạng wrap - chỉ dành cho khi màn hình kích thước nhỏ
    wrapConversationId: (state, action) => {
      const conversationId = action.payload;

      //nếu mảng chưa có gì thì ta thêm vào vị trí đầu luôn
      if (state.conversationIdArr.length === 0) {
        state.conversationIdArr[0] = conversationId;
      }
      //nếu đã có 1 phần tử
      else if (state.conversationIdArr.length === 1) {
        //nếu ở vị trí 0 === giá trị ta muốn thêm thì ta không cần làm gì cả
        if (state.conversationIdArr[0] === conversationId) return;
        //ngược lại thì ta chuyển cái giá trị hiện tại sang vị trí 1
        //và set giá trị mới vào vị trí 0
        state.conversationIdArr[1] = state.conversationIdArr[0];
        state.conversationIdArr[0] = conversationId;
      }
      //nếu đã có 2 phần tử
      else if (state.conversationIdArr.length === 2) {
        //nếu ở vị trí 0 === giá trị ta muốn thêm thì ta không cần làm gì cả
        if (state.conversationIdArr[0] === conversationId) return;
        //còn nếu không phải thì mục đích của ta là sẽ phải đưa cái thằng ta muốn thêm vào lên vị trí 0
        //và cái ở 0 sẽ set giá trị của 1
        else {
          state.conversationIdArr[1] = state.conversationIdArr[0];
          state.conversationIdArr[0] = conversationId;
        }
      }
    },

    //xóa một conversationId ra khỏi mảng
    deleteConversationId: (state, action) => {
      const conversationId = action.payload;
      const conversationIndex = state.conversationIdArr.findIndex(
        (item) => item === conversationId
      );
      if (conversationIndex >= 0) {
        state.conversationIdArr.splice(conversationIndex, 1);
      }
    },
  },
});


export const {addConversationId,deleteConversationId,wrapConversationId} = chatTabSlice.actions;

export default chatTabSlice.reducer;