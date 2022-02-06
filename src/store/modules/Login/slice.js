import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading:false,
  //ban đầu cho là true trước để hệ thống không khởi động appRoute
  //sau khi verify dù là thành công hay thất bại => thành false
  verifyLoading: true,
  
}

const loginSlice = createSlice({
  name:"login",
  initialState,
  reducers:{
    submitLoginSaga:(state,action) => {
      state.loading = true;
    },
    submitGoogleLoginSaga: (state, action) => {
      state.loading = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    verifySaga:(state) => {
      state.verifyLoading = true;
    },
    setIsVerify:(state,action) => {
      state.isVerify = action.payload;
    },
    setVerifyLoading: (state, action) => {
      state.verifyLoading = action.payload;
    },
    refreshSaga:(state, action) => {

    },
    logoutSaga: (state) => {

    }
    
  }
})

export const {
  submitLoginSaga,
  submitGoogleLoginSaga,
  setLoading,
  verifySaga,
  setIsVerify,
  setVerifyLoading,
  refreshSaga,
  logoutSaga,
  
  
} = loginSlice.actions;

export default loginSlice.reducer;