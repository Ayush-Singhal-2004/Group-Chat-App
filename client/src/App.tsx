import LoginPage from "./routes/LoginPage"
import { Routes, Route, HashRouter } from "react-router-dom"
import AccountCreationPage from "./components/AccountCreationPage"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import LogoutPage from "./routes/LogoutPage"
import Home from "./routes/Home"
import CreateRoom from "./routes/CreateRoom"
import JoinRoom from "./routes/JoinRoom"
import ChatRoom from "./routes/ChatRoom"

function App() {

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log("Logged In");
                setUser(user);
            }
            else {
                setUser(null);
            }
        })
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={!user ? <LoginPage /> : <LogoutPage />} />
                <Route path="/account/create" element={<AccountCreationPage />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/" element={<ChatRoom />} /> */}
                <Route  path="/room/create" element={<CreateRoom />} />
                <Route  path="/room/join" element={<JoinRoom />} />
            </Routes>
        </HashRouter>
    )
}

export default App