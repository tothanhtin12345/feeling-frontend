import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    loading: false,
    message: null,
    
}


const emailVerificationSlice = createSlice({
    name:"emailVerification",
    initialState,
    reducers:{
        //xác minh email
        verifyEmailSaga:(state, action) => {
            state.loading = true;
            state.message = "Đang xác nhận Email, vui lòng đợi trong giây lát";
        },
        //xác minh lại nếu hạn hết
        verifyEmailAgain:(state, action) => {
            state.loading = true;
        },
        setEmailVerificationMessage:(state, action) => {
            state.message = action.payload
        },
        setEmailVerificationLoading: (state, action) => {
            state.loading = action.payload;
        },
        reset:(state, action) => {
            return initialState;
        }
    }
})


export const {
    verifyEmailSaga,
    verifyEmailAgain,
    setEmailVerificationLoading,
    setEmailVerificationMessage,
    reset,
} = emailVerificationSlice.actions;


export default emailVerificationSlice.reducer;