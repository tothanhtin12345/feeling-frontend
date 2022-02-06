import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    message: null,
}
const changePasswordFormSlice = createSlice({
    name:"changePasswordForm",
    initialState,
    reducers:{
        changePasswordSaga:(state,action)=>{
            state.loading = true;
        },
        setChangePasswordFormLoading: (state,action) => {
            state.loading = action.payload;
        },
        setChangePasswordFormMessage:(state,action) => {
           
            state.message = action.payload;
        }

    }
})

export const {changePasswordSaga, setChangePasswordFormLoading, setChangePasswordFormMessage} = changePasswordFormSlice.actions;


export default changePasswordFormSlice.reducer;