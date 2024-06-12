import { Link } from "react-router-dom";
import CreateRoomButton from "../components/CreateRoomButton";
import JoinRoomButton from "../components/JoinRoomButton";

function Home() {

    return (
        <div className="flex flex-col items-center gap-10">
            <Link to="/room/create">
                <CreateRoomButton />
            </Link>
            <Link to="/room/join">
                <JoinRoomButton />
            </Link>
        </div>
    )
}

export default Home;