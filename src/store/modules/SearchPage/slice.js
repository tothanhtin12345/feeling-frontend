import { createSlice } from "@reduxjs/toolkit";

//code của mình

const initialState = {
  users: [],
  groups: [],
  loading: false,
  skip: 0,

  limit: 10,
  canLoad: true,
};

const searchPageSlice = createSlice({
  name: "searchPage",
  initialState,
  reducers: {
    //thực hiện search trên header
    doSearchPageSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
      state.loading = true;
    },
    //khi nhận kết quả search
    giveSearchPageResult: (state, action) => {
      const { users, groups, type } = action.payload;
      if (type === "users") {
        state.users = [...state.users, ...users];
      } else if (type === "groups") {
        state.groups = [...state.groups, ...groups];
      }

     
    },
    setSearchPageLoading: (state, action) => {
      state.loading = action.payload;
    },

    changeSearchPageSkip: (state, action) => {
      state.skip += action.payload;
    },
    setSearchPageCanload: (state, action) => {
      state.canLoad = action.payload;
    },
    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  doSearchPageSaga,
  giveSearchPageResult,
  setSearchPageLoading,
  changeSearchPageSkip,
  setSearchPageCanload,
  reset,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
