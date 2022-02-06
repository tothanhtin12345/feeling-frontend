import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    message: null,

}

const wallSettingFormSlice = createSlice({
    name:"wallSettingForm",
    initialState,
    reducers:{
        updateWallSettingSaga:(state,action) => {
            state.loading = true;
        },

        setWallSettingLoading:(state, action)=>{
            state.loading = action.payload;
        },
        setWallSettingMessage: (state, action) => {
            state.message = action.payload;
        }
        
    }
})

export const {
    updateWallSettingSaga,
    setWallSettingLoading,
    setWallSettingMessage,
} = wallSettingFormSlice.actions;

export default wallSettingFormSlice.reducer;