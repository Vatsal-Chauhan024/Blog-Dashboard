import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error= false;
            state.loading=null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = UserSlice.actions
export default UserSlice.reducer;