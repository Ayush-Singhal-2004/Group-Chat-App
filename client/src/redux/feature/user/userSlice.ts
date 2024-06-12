import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    email: string,
    username: string
}

const user: UserState = {
    email: "",
    username: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState: user,
    reducers: {
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }    
    }
});

export default userSlice.reducer;