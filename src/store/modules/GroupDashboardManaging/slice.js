import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //hiển thị form không ?
  newGroupModalVisible: false,
  newGroupLoading: false,
  newGroupError: null,

  skip: 0,
  limit: 12,
  canLoad: true,
  groupsManaging: [],
  fetchLoading: false,
  fetchError: false,
};

const groupDashboardManagingSlice = createSlice({
  name: "groupDashboardManaging",
  initialState,
  reducers: {
    //toggle form
    toggleNewGroupModal: (state, action) => {
      if (action.payload) {
        state.newGroupModalVisible = action.payload;
      } else {
        state.newGroupModalVisible = !state.newGroupModalVisible;
      }
    },

    //thêm một nhóm mới
    addNewGroupSaga: (state, action) => {
      state.newGroupLoading = true;
    },
    addNewGroup: (state, action) => {
      state.groupsManaging = [action.payload, ...state.groupsManaging];
      console.log(state.groupsManaging);
      //tăng skip
      state.skip += 1;
    },

    //update thông tin một nhóm
    updateGroupInformationsSaga: (state, action) => {
      state.newGroupLoading = true;
    },

    setNewGroupLoading: (state, action) => {
      state.newGroupLoading = action.payload;
    },
    setNewGroupError: (state, action) => {
      state.newGroupError = action.payload;
    },

    //lấy dữ liệu các nhóm đang quản lý
    fetchGroupsMangingSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        
        limit: state.limit,
      };

      if(state.groupsManaging.length > 0) {
        action.payload = {
          ...action.payload,
          lastId: state.groupsManaging[state.groupsManaging.length - 1]._id,
        }
      }

      state.fetchLoading = true;
    },
    fetchGroupsManging: (state, action) => {
      state.groupsManaging = [...state.groupsManaging, ...action.payload];
      state.fetchLoading = false;
    },

    setFetchGroupsManagingLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },

    //thay đổi giá trị skip
    changeGroupsManagingSkip: (state, action) => {
      state.skip += action.payload;
    },

    //thay đổi giá trị can load groupsManaging
    setGroupsManagingCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    //set error
    setGroupsManagingError: (state, action) => {
      state.fetchError = action.payload;
    },

    //update một thông tin của một dữ liệu gorup managing

    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  toggleNewGroupModal,
  setGroupsManagingCanLoad,
  setGroupsManagingError,
  setNewGroupError,
  setNewGroupLoading,
  addNewGroupSaga,
  addNewGroup,
  fetchGroupsManging,
  fetchGroupsMangingSaga,
  changeGroupsManagingSkip,
  reset,
  setFetchGroupsManagingLoading,
  updateGroupInformationsSaga,
} = groupDashboardManagingSlice.actions;

export default groupDashboardManagingSlice.reducer;
