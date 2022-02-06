import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  accountInfor: null, //sẽ bao gồm email và username
  verificationCode: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    //thực hiện gửi tên tài khoản và email để nhận được mã code
    getVerificationCodeSaga: (state, action) => {
      state.loading = true;
    },
    //thực hiện gửi mã xác minh, tài khoản, email
    sendVerificationCodeSaga: (state, action) => {
      state.loading = true;
    },
    //lưu mã xác minh vào trong store
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
    //lưu thông tin username và email để dùng lại vào trong store
    setAccountInfor: (state, action) => {
      // const {email, username} = action.payload;
      state.accountInfor = action.payload;
    },
    //mật khẩu mới - sẽ nhận vào username, password, verificationCode để tiến hành gửi lên server
    newPasswordSaga: (state, action) => {
      state.loading = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  getVerificationCodeSaga,
  setAccountInfor,
  setLoading,
  sendVerificationCodeSaga,
  setVerificationCode,
  newPasswordSaga,
  resetState,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
