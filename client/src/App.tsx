import LoginPage from "./routes/LoginPage"
import { Routes, Route, HashRouter } from "react-router-dom"
import AccountCreationPage from "./routes/AccountCreationPage"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import LogoutPage from "./routes/LogoutPage"
import Home from "./routes/Home"
import CreateRoom from "./routes/CreateRoom"
import JoinRoom from "./routes/JoinRoom"
import ChatRoom from "./routes/ChatRoom"
import axios from "axios"
import { UseDispatch, useDispatch } from "react-redux"
import { setUser } from "./redux/feature/user/userSlice"
import { setRoomId } from "./redux/feature/room/roomSlice"

function App() {

    const [userEmail, setUserEmail] = useState<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // console.log("Logged In");
                setUserEmail(user.email);  
            }
            else {
                setUserEmail(null);
            }
        })
    }, []);

    useEffect(() => {
        if(userEmail) {
            axios.get(`https://group-chat-app-poq9.onrender.com:10000/user/${userEmail}`)
            .then((response) => {
                // console.log(response.data);
                if(response.data.joinedRoom != null) {
                    dispatch(setRoomId(response.data.joinedRoom));
                }
                dispatch(setUser(response.data));
            })
            .catch( (err) => console.log(err) )
        }
    });

    return (
        <HashRouter>
            <Routes>
                <Route path="/" 
                element={!userEmail ? <AccountCreationPage /> : <Home />} />
                <Route  path="/room/create" element={<CreateRoom />} />
                <Route  path="/room/join" element={<JoinRoom />} />
                <Route  path="/room/:roomId" element={<ChatRoom />} />
            </Routes>
        </HashRouter>
    )
}

export default App