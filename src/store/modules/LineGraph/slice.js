import { createSlice } from "@reduxjs/toolkit";

//code của mình

const initialState = {
    loading: false,
    data: [],
    
}





const graphLineSlice = createSlice({
    name:"graphLine",
    initialState,
    reducers:{
        fetchGraphLineSaga:(state, action) => {
            state.loading = true;
            
        },
        fetchGraphLine:(state,action) => {
            const {monthData} = action.payload;
            state.data = [...monthData];
        },
        setGraphLineLoading:(state, action) => {
            state.loading = action.payload;
        },

        reset:(state, action) => {
            return initialState;
        }
    }
})


export const {
    fetchGraphLine,
    fetchGraphLineSaga,
    setGraphLineLoading,
    reset,
} = graphLineSlice.actions;


export default graphLineSlice.reducer;