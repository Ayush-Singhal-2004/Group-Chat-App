import { Link } from "react-router-dom";
import CreateRoomButton from "../components/CreateRoomButton";
import JoinRoomButton from "../components/JoinRoomButton";
import LogoutPage from "./LogoutPage";

function Home() {

    return (
        <div className="w-screen flex flex-col items-center gap-10">
            <Link to="/room/create">
                <CreateRoomButton />
            </Link>
            <Link to="/room/join">
                <JoinRoomButton />
            </Link>
            <LogoutPage />
        </div>
    )
}

export default Home;