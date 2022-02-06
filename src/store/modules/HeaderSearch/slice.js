import { createSlice } from "@reduxjs/toolkit";

//code của mình

const initialState = {
  users: [],
  groups: [],
  loading: false,
  skip: 0,
  //5 groups - 5 user
  limit: 5,
};

const headerSearchSlice = createSlice({
  name: "headerSearch",
  initialState,
  reducers: {
    //thực hiện search trên header
    doHeaderSearchSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
      state.loading = true;
    },
    //khi nhận kết quả search
    giveSearchResult: (state, action) => {
      const { users, groups } = action.payload;

      state.groups = [...groups];
      state.users = [...users];
    },
    setHeaderSearchLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  doHeaderSearchSaga,
  giveSearchResult,
  setHeaderSearchLoading,
  reset,
} = headerSearchSlice.actions;

export default headerSearchSlice.reducer;
