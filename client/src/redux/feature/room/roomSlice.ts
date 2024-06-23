import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoomState {
    "roomId": string | null,
    "roomName": string,
    "members": []
}

const room: RoomState = {
    "roomId": null,
    "roomName": "",
    "members": []
}

export const roomSlice = createSlice({
    "name": "room-id",
    initialState: room,
    reducers: {
        setRoomId: (state: RoomState, action: PayloadAction<string>) => {
            state.roomId = action.payload
        },
        setRoom: (state: RoomState, action: PayloadAction<RoomState>) => {
            state.roomId = action.payload.roomId;
            state.roomName = action.payload.roomName;
            state.members = action.payload.members;
        }
    }
});

export const { setRoomId, setRoom } = roomSlice.actions;
export default roomSlice.reducer;