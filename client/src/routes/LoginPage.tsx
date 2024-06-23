import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase"
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function LoginPage() {

    const navigate = useNavigate();

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user.email);
            navigate("/account/create");
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div className="w-screen flex justify-center">
            <button onClick={loginWithGoogle}
            className="bg-[#1A1A1A] p-3 rounded-lg flex items-center gap-2">
                <FaGoogle />
                Login with Google
            </button>
        </div>
    )
}

export default LoginPage