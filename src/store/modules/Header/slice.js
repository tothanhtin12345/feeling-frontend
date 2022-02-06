import { createSlice } from "@reduxjs/toolkit";

//quản lý phần header
const initialState = {
  headerActionModalVisible: false,
  // sẽ có 3 giá trị nếu được chọn "Messages", "Notify", "Search", "UsersSetting"
  headerButtonSelected:null,
}

const headerSlice = createSlice({
  name:"header",
  initialState,
  reducers:{
    toggleHeaderActionButton: (state,action) => {
      const buttonSelectedName = action.payload;
      
      //kiểm tra xem
      //nếu người dùng chưa chọn nút nào thì toggle (trường hợp này sẽ mở)
      //hoặc
      //nếu người dùng đang chọn một nút mà bấm lại nút đó thì sẽ tiến hành toggle (sẽ đóng)
      if(!state.headerButtonSelected || state.headerButtonSelected === buttonSelectedName) {
        state.headerActionModalVisible = !state.headerActionModalVisible;
      }
      //gán giá trị nút chọn mới 
      state.headerButtonSelected = state.headerButtonSelected === buttonSelectedName ? null : buttonSelectedName;
    },
    // toggleSearchInput: (state,action) => {
      
    //   //nếu đang chọn Search mà nhấn lại lần nữa thì set null để ẩn
    //   if(state.headerButtonSelected === "Search" || !state.headerButtonSelected) {
    //     state.headerActionModalVisible = !state.headerActionModalVisible;
    //   } 
    //   state.headerButtonSelected = state.headerButtonSelected === "Search" ? null : "Search";
    // },
    // toggleNotifyButton: (state,action) => {
    //    //nếu đang chọn Search mà nhấn lại lần nữa thì set null để ẩn
    //    if(state.headerButtonSelected === "Notify" || !state.headerButtonSelected) {
    //     state.headerActionModalVisible = !state.headerActionModalVisible;
    //   } 
    //   state.headerButtonSelected = state.headerButtonSelected === "Notify" ? null : "Notify";
    // },
    // togglMessageshButton: (state,action) => {
    //   //nếu đang chọn Search mà nhấn lại lần nữa thì set null để ẩn
    //   if(state.headerButtonSelected === "Messages" || !state.headerButtonSelected) {
    //     state.headerActionModalVisible = !state.headerActionModalVisible;
    //   } 
    //   state.headerButtonSelected = state.headerButtonSelected === "Messages" ? null : "Messages";
    // },
    resetHeader: (state,action) => {
   
      return initialState;
    }
    
  }
});

export const {
 toggleHeaderActionButton,
 resetHeader,
} = headerSlice.actions;

export default headerSlice.reducer;