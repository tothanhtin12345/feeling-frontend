import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: null,
    //một message thành công
    message: null,
}

const informationFormSlice = createSlice({
    name:"informationForm",
    initialState,
    reducers:{
        updateUserInformationSaga:(state,action) => {
            state.loading = true;
        },
        setInformationFormLoading: (state,action) => {
            state.loading = action.payload;
        },
        setInformationFormMessage:(state,action) => {
            
            state.message = action.payload;
        }
    }
})


export const {
    updateUserInformationSaga,
    setInformationFormLoading,
    setInformationFormMessage,
}= informationFormSlice.actions;

export default informationFormSlice.reducer;