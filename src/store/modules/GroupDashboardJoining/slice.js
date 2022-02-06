import { createSlice } from "@reduxjs/toolkit";

// code của mình
import {
  setCardButtonLoadingMethod,
  setShowOutConfirmModalMethod,
} from "./methods";

const initialState = {
  skip: 0,
  limit: 12,
  canLoad: true,
  groupsJoining: [],
  fetchLoading: false,
  fetchError: false,
};

const groupDashboardJoiningSlice = createSlice({
  name: "groupDashboardJoining",
  initialState,
  reducers: {
    //lấy danh sách nhóm
    fetchGroupsJoiningSaga: (state, action) => {
      action.payload = {
        ...action.payload,
   
        limit: state.limit,
      };

      if(state.groupsJoining.length > 0) {
        action.payload = {
          ...action.payload,
          lastId: state.groupsJoining[state.groupsJoining.length - 1]._id,
        }
      }

      state.fetchLoading = true;
    },

    fetchGroupsJoining: (state, action) => {
      state.groupsJoining = [...state.groupsJoining, ...action.payload];
    },

    setGroupsJoiningFectchLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },

    //
    setGroupsJoiningCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    changeGroupJoiningSkip: (state, action) => {
      state.skip += action.payload;
    },

    //rời khỏi nhóm
    outGroupSaga: (state, action) => {
      const { groupId } = action.payload;
      //set loading cho group card
      setCardButtonLoadingMethod(state, groupId, true);
    },

    outGroup: (state, action) => {
      const { groupId } = action.payload;

      //xóa group đó ra khỏi danh sách group
      state.groupsJoining = state.groupsJoining.filter(
        (item) => item._id !== groupId
      );

      //giảm skip
      if (state.skip >= 1) {
        state.skip -= 1;
      }
    },

    setGroupCardButtonLoading: (state, action) => {
      const { groupId, loadingVal } = action.payload;
      setCardButtonLoadingMethod(state, groupId, loadingVal);
    },

    //hiển thị modal confirm rời khỏi nhóm
    setShowOutConfirmModal: (state, action) => {
      const { groupId, showModal } = action.payload;
      setShowOutConfirmModalMethod(state, groupId, showModal);
    },

    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  fetchGroupsJoining,
  fetchGroupsJoiningSaga,
  setGroupsJoiningCanLoad,
  changeGroupJoiningSkip,
  setGroupsJoiningFectchLoading,
  outGroup,
  outGroupSaga,
  setShowOutConfirmModal,
  setGroupCardButtonLoading,
  reset,
} = groupDashboardJoiningSlice.actions;

export default groupDashboardJoiningSlice.reducer;
