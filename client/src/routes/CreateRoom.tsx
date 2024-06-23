import CreateRoomButton from "../components/CreateRoomButton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../redux/feature/room/roomSlice";

function CreateRoom() {

    const user = useSelector((state: RootState) => state.user);
    const room = useSelector((state: RootState) => state.room);

    const [roomName, setRoomName] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createRoom = async() => {
        if(!user.email) {
            return;
        }
        const response = await axios.post("https://group-chat-app-poq9.onrender.com:10000/room/create", {
            "userEmail": user.email,
            "roomName": roomName
        })
        if(response.data.status == "success") {
            const room = response.data.room;
            dispatch(setRoom({
                "roomId": room._id,
                "roomName": room.name,
                "members": room.members
            }));
            navigate(`/room/:${room._id}`);
        }
    }

    return (
        <div className="w-screen flex flex-col items-center gap-5">
            <input type="text" placeholder="Enter your room name"
            value={roomName} onChange={(e) => setRoomName(e.target.value)} 
            className="p-3 rounded-md pl-4" />
            <div className={roomName.length < 3 ? "pointer-events-none" : ""} 
            onClick={createRoom}>
                <CreateRoomButton />
            </div>
        </div>
    )
}

export default CreateRoom;