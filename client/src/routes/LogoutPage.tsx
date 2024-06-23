import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function LogoutPage() {

    const handleLogout = () => {
        signOut(auth)
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="w-screen flex justify-center">
            <button onClick={handleLogout}
            className="bg-[#1A1A1A] p-3 rounded-lg">Log out</button>
        </div>
    )
}

export default LogoutPage;