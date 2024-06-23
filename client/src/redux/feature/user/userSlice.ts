import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    profileImage: string,
    email: string,
    username: string,
    joinedRoom: string | null
}

const user: UserState = {
    profileImage: "",
    email: "",
    username: "",
    joinedRoom: null
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
        },
        setProfilePicture: (state, action: PayloadAction<string>) => {
            state.profileImage = action.payload
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.email = action.payload.email
            state.profileImage = action.payload.profileImage
            state.username = action.payload.username
            state.joinedRoom = action.payload.joinedRoom
        },
        setJoinedRoom: (state: UserState, action: PayloadAction<UserState>) => {
            state.joinedRoom = action.payload.joinedRoom
        }
    }
});


export const { setUserEmail, setUserName, setUser } = userSlice.actions;
export default userSlice.reducer;