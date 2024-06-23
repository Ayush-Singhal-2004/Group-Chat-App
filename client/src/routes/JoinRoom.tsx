import { useState } from "react";
import JoinRoomButton from "../components/JoinRoomButton";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setRoomId as setRoomId_redux } from "../redux/feature/room/roomSlice";

function JoinRoom() {

    const [roomId, setRoomId] = useState<string>("");
    const [errMessage, setErrMessage] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const joinRoom = async() => {
        if(user.email) {
            const response = await axios.post("https://group-chat-app-poq9.onrender.com/room/join", {
                "userEmail": user.email,
                "roomId": roomId
            })
            console.log(response.data);
            if(response.data.status == "success") {
                dispatch(setRoomId_redux(roomId));
                navigate(`/room/${roomId}`);
            }
            else {
                setErrMessage(true);
                setRoomId("");
            }
        }
    }

    return (
        <div className="w-screen flex flex-col items-center justify-center gap-4">
            {
                errMessage 
                && 
                <p className="text-red-400 text-sm">Invalid room id or something!!</p>
            }
            <input type="text" placeholder="Enter room id"
            className="p-3 rounded-md pl-4" value={roomId}
            onChange={e => setRoomId(e.target.value)}
            />
            <div className={`${roomId.length < 5 ? "pointer-events-none" : ""}`}
            onClick={joinRoom}>
                <JoinRoomButton />
            </div>
        </div>
    )
}

export default JoinRoom;