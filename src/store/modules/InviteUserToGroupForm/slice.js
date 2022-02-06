import { createSlice } from "@reduxjs/toolkit";


//form mời người dùng vào nhóm
const initialState = {

    searchLoading: false,
    submitLoading: false,
    inviteUserModalVisible: false,
    //dữ liệu người dùng được search
    users:[],
    //giới hạn khi search
    limit: 10,

}


const inviteUserToGroupFormSlice = createSlice({
    name:"inviteUserToGroupForm",
    initialState,
    reducers:{
        toggleInviteUserModalVisible:(state, action)=>{
            if(action.payload){
                state.inviteUserModalVisible = action.payload;
            }
            else{
                state.inviteUserModalVisible = !state.inviteUserModalVisible;
            }
        },

        searchUserToInviteSaga:(state, action) => {
            action.payload={
                ...action.payload,
                limit: state.limit,
            }
            state.searchLoading = true;
        },

        searchUserToInvite:(state, action) => {
            const {users} = action.payload;
            state.users = [...users]
        },

        //thực hiện nộp form
        submitInviteUserFormSaga:(state, action) => {
            state.submitLoading = true;
        },

        submitInviteUserForm:(state, action)=>{
            
        },
        
        setSearchLoading:(state, action) => {
            state.searchLoading = action.payload;
        },


        setSubmitLoading:(state, action)=>{
            state.submitLoading = action.payload;
        },

        //reset kết quẳ search
        resetSearchResult:(state, action) => {
            state.users = []
            state.searchLoading = false;
            
        },

        //reset toàn bộ
        reset:(state, action) => {
            return initialState;
        }
        

    }
})


export const {
    toggleInviteUserModalVisible,
    searchUserToInvite,
    searchUserToInviteSaga,
    setSearchLoading,
    setSubmitLoading,
    submitInviteUserForm,
    submitInviteUserFormSaga,
    resetSearchResult,
    reset
} = inviteUserToGroupFormSlice.actions;


export default inviteUserToGroupFormSlice.reducer;