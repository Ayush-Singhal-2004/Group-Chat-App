import { useState } from "react";
import CreateRoomButton from "../components/CreateRoomButton";

function CreateRoom() {

    const [roomName, setRoomName] = useState<string>("");

    const createRoom = () => {
        //TODO
    }

    return (
        <div className="flex flex-col items-center gap-5">
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