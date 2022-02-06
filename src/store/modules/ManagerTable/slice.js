import { createSlice } from "@reduxjs/toolkit";

//code của mình
const initialState = {
  loading: false,
  //mảng dữ liệu
  users: [],
  posts:[],
  groups:[],
  documentCount: 0,
};

const managerTableSlice = createSlice({
  name: "managerTable",
  initialState,
  reducers: {
    //thực hiện fetch
    fetchTableDataSaga: (state, action) => {
      state.loading = true;
    },
    fetchTableData: (state, action) => {
      const { data, documentCount, type } = action.payload;
      if(type === "users"){
        state.users = [...data];
      }
      else if(type === "groups"){
        state.groups = [...data];
      }
      else if(type === "posts"){
        state.posts = [...data];
      }
   
      state.documentCount = documentCount;
    },
    setManagerTableLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  fetchTableDataSaga,
  fetchTableData,
  setManagerTableLoading,
  reset,
} = managerTableSlice.actions;

export default managerTableSlice.reducer;
