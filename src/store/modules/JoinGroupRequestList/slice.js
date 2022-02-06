import { createSlice } from "@reduxjs/toolkit";

//code của mình
import { setCardButtonLoadingMethod } from "./methods";

const initialState = {
  loading: false,
  // danh sách những user yêu cầu tham gia nhóm
  requestList: [],
  skip: 0,
  limit: 12,
  canLoad: true,
};

const joinGroupRequestListSlice = createSlice({
  name: "joinGroupRequestList",
  initialState,
  reducers: {
    //lấy danh sách những user yêu cầu tham gia
    fetchJoinGroupRequestListSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };

      state.loading = true;
    },
    fetchJoinGroupRequestList: (state, action) => {
      state.requestList = [...state.requestList, ...action.payload];
   
    },
    addGroupRequest:(state,action) => {
      const {userRequest} = action.payload;
      state.requestList = [userRequest,...state.requestList];
      state.skip += 1;
    },
    deleteGroupRequest:(state, action) => {
      const {userRequestId} = action.payload;
      const userRequestIndex = state.requestList.findIndex((item) => item._id === userRequestId);
      if(userRequestIndex >=0 ){
        state.requestList = state.requestList.filter((item) => item._id !== userRequestId);
        state.skip -= 1;
      }
    },
    setJoinGroupRequestListLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeJoinGroupRequestListSkip: (state, action) => {
      state.skip += action.payload;
    },
    setJoinGroupRequestListCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    //chấp nhận yêu cầu tham gia nhóm
    acceptJoinGroupRequestSaga: (state, action) => {
      const { userId } = action.payload;
      setCardButtonLoadingMethod(state, userId, true);
    },
    acceptJoinGroupRequest: (state, action) => {
      const { userId, groupId } = action.payload;

      //nếu thành công thì - vì đã chấp nhận - nên ta sẽ bỏ người đó ra khỏi list

      //ta cần phải lấy ra index của người đó xem là người đó có tồn tại không để giảm skip
      const userIndex = state.requestList.findIndex(
        (item) => item._id == userId
      );
      if (userIndex >= 0) {
        if (state.skip >= 1) {
          state.skip -= 1;
        }
      }

      state.requestList = state.requestList.filter(
        (item) => item._id !== userId
      );
    },

    //từ chối yêu cầu tham gia nhóm
    denyJoinGroupRequestSaga: (state, action) => {
      const { userId } = action.payload;
      setCardButtonLoadingMethod(state, userId, true);
    },
    denyJoinGroupRequest: (state, action) => {
      const { userId, groupId } = action.payload;

      //nếu thành công thì - vì đã từ chối - nên ta sẽ bỏ người đó ra khỏi list

      //ta cần phải lấy ra index của người đó xem là người đó có tồn tại không để giảm skip
      const userIndex = state.requestList.findIndex(
        (item) => item._id == userId
      );
      if (userIndex >= 0) {
        if (state.skip >= 1) {
          state.skip -= 1;
        }
      }

      state.requestList = state.requestList.filter(
        (item) => item._id !== userId
      );
    },

    //set cart loading - khi ta tương tác với card thì ta sẽ gửi một request lên server
    // trong quá trình đó ta cũng phải có một loading để khóa các button lại  và nếu thât bại thì cũng có thể mở khóa
    // (nhưng việc này thường được thực hiện ở các hàm tương tác rồi)
    // nên hàm này có lẽ sẽ dùng nhiều trong trường hợp check thất bại

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
  fetchJoinGroupRequestList,
  fetchJoinGroupRequestListSaga,
  changeJoinGroupRequestListSkip,
  setJoinGroupRequestListCanLoad,
  setJoinGroupRequestListLoading,
  acceptJoinGroupRequest,
  acceptJoinGroupRequestSaga,
  denyJoinGroupRequest,
  denyJoinGroupRequestSaga,
  setCardButtonLoading,
  addGroupRequest,
  deleteGroupRequest,
  reset,
} = joinGroupRequestListSlice.actions;

export default joinGroupRequestListSlice.reducer;
