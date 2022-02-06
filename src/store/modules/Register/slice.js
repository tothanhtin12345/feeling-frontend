import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
}

const registerSlice = createSlice({
  name:"register",
  initialState,
  reducers:{
    submitRegisterSaga:(state, action) => {
      state.loading = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;;
      state.loading = false;
    }
  }
})

export const {
  submitRegisterSaga,
  setError,
  setLoading,
} = registerSlice.actions;

export default registerSlice.reducer;