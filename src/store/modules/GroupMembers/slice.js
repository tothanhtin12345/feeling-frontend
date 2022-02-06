import { createSlice } from "@reduxjs/toolkit";

//code của mình
import {updateMemberMethod, setCardButtonLoadingMethod,setDissmissConfirmMethod} from "./methods";


const initialState = {
  loading: false,
  // danh sách members
  members: [],
  skip: 0,
  limit: 12,
  canLoad: true,
};

const groupMembersSlice = createSlice({
  name: "groupMembers",
  initialState,
  reducers: {
    //lấy danh sách members
    fetchGroupMembersSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };

      state.loading = true;
    },
    fetchGroupmembers: (state, action) => {
      state.members = [...state.members, ...action.payload];
    },

    addGroupMember: (state, action) => {
      const {member} = action.payload;
      state.members = [
        member,
        ...state.members,
      ]
      state.skip += 1;
    },


    setGroupMembersLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeGroupMembersSkip: (state, action) => {
      state.skip += action.payload;
    },
    setGroupMembersCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    //set quyền kiểm duyệt cho một member
    setInspectorRoleSaga: (state, action) => {
      const { userId } = action.payload;
      setCardButtonLoadingMethod(state, userId, true);
    },

    setInspectorRole: (state, action) => {
      const {userId, data} = action.payload;
      updateMemberMethod({state,userId,data});
    },

    //hủy quyền kiểm duyệt của một member
    unSetInspectorRoleSaga: (state,action) => {
      const { userId } = action.payload;
      setCardButtonLoadingMethod(state, userId, true);
    },

    unSetInspectorRole:(state, action) => {
      const {userId, data} = action.payload;
      updateMemberMethod({state,userId,data});
    },

    //mời một member ra khỏi nhóm
    dismissMemberSaga:(state, action) => {
      const { userId } = action.payload;
      setCardButtonLoadingMethod(state, userId, true);
    },
    
    dismissMember:(state, action) => {

      

      
      const {userId} = action.payload;

     

      //xóa member ra khỏi list
      state.members = state.members.filter((item) => item._id !== userId);


    },
    //set hiển thị cái modal xác nhận - (dành cho mỗi user card luôn)
    setShowConFirmDismissModal: (state, action) => {
      const { userId, showModal } = action.payload;
      setDissmissConfirmMethod(state,userId,showModal); 
    },

    setCardButtonLoading: (state, action) => {
      const { userId, loadingVal } = action.payload;
      setCardButtonLoadingMethod(state, userId, loadingVal);
    },

    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  fetchGroupMembersSaga,
  fetchGroupmembers,
  setGroupMembersCanLoad,
  setGroupMembersLoading,
  changeGroupMembersSkip,
  setCardButtonLoading,
  setInspectorRole,
  setInspectorRoleSaga,
  unSetInspectorRole,
  unSetInspectorRoleSaga,
  dismissMember,
  dismissMemberSaga,
  setShowConFirmDismissModal,
  addGroupMember,
  reset,
} = groupMembersSlice.actions;

export default groupMembersSlice.reducer;
