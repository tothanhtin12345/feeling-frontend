import { createSlice } from "@reduxjs/toolkit";

//code của mình

import {
  setCardButtonLoadingMethod,
  setShowCancelGroupModalMethod,
} from "./methods";

const initialState = {
  skip: 0,
  limit: 12,
  canLoad: true,
  groupsSent: [],
  fetchLoading: false,
  fetchError: false,
};

const groupsDashboardSentSlice = createSlice({
  name: "groupsDashboardSent",
  initialState,
  reducers: {
    //lấy danh sách các nhóm mà minh đã yêu cầu tham gia

    fetchGroupsSentSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };

      if(state.groupsSent.length > 0) {
        action.payload = {
          ...action.payload,
          lastId: state.groupsSent[state.groupsSent.length - 1]._id,
        }
      }

      state.fetchLoading = true;
    },
    fetchGroupsSent: (state, action) => {
      state.groupsSent = [...state.groupsSent, ...action.payload];
    },

    setFetchGroupSentLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },

    setGroupsSentCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    changeGroupSentSkip: (state, action) => {
      state.skip += action.payload;
    },

  
    // //hiển thị modal confirm việc hủy yêu cầu tham gia nhóm
    // setCancelConfirmModal: (state, action) => {
    //   const { groupId, showModal } = action.payload;
    //   setShowCancelGroupModalMethod(state, groupId, showModal);
    // },

    //hủy yêu cầu tham gia nhóm
    cancelJoiningRequestSaga: (state, action) => {
      const { groupId } = action.payload;
      setCardButtonLoadingMethod(state,groupId, true);
      
    },

    cancelJoiningRequest: (state, action) => {
      const { groupId } = action.payload;

      state.groupsSent = state.groupsSent.filter(
        (item) => item._id !== groupId
      );

      if (state.skip >= 1) {
        state.skip -= 1;
      }
    },

    setGroupCardButtonLoading: (state, action) => {
      const { groupId, loadingVal } = action.payload;
      setCardButtonLoadingMethod(state, groupId, loadingVal);
    },


    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  fetchGroupsSent,
  fetchGroupsSentSaga,
  
  setGroupCardButtonLoading,
  setFetchGroupSentLoading,
  setGroupsSentCanLoad,
  reset,
  cancelJoiningRequest,
  cancelJoiningRequestSaga,
  changeGroupSentSkip,
} = groupsDashboardSentSlice.actions;

export default groupsDashboardSentSlice.reducer;
