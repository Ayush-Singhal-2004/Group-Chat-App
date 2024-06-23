import { useEffect, useRef, useState } from "react"
import MemberList from "../components/MemberList"
import { io } from "socket.io-client"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setRoom } from "../redux/feature/room/roomSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const socket = io("http://localhost:3001");

function Message({message}: any) {
    return (
        <div className="mb-3">
            <div>
                <p className="text-xs mb-1 opacity-90">{message.sender.username}</p>
                <p className="text-black bg-white py-2 px-3 rounded-md 
                max-w-[40%] inline-block max-sm:max-w-[70%]">
                    {message.message}
                </p>
            </div>
        </div>
    )
}

function ChatRoom() {

    const [message, setMessage] = useState<string>("");
    const [isSmViewPort, setIsSmViewPort] = useState<boolean>(false);
    const [memberSection, setMemberSection] = useState<boolean>(false);
    const [roomFlag, setRoomFlag] = useState<boolean>(false);
    const [messages, setMessages] = useState<object[]>([]);

    const messageSectionRef = useRef<HTMLDivElement>(null);

    const user = useSelector((state: RootState) => state.user);
    const room = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(!roomFlag && room.roomId) {
            setRoomFlag(true);
        }
    }, [room])

    useEffect(() => {
        if(room.roomId) {
            socket.emit("getRoom-details", {
                "userEmail": user.email,
                "roomId": room.roomId
            });
        }
    }, [roomFlag])

    useEffect(() => {
        if(room.roomId) {
            axios.get(`http://localhost:3001/room/${room.roomId}/chats`)
            .then((res) => {
                console.log(res);
                setMessages(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [roomFlag])

    useEffect(() => {
        if(room.roomId) {   
            socket.emit("join-room", {
                "roomId": room.roomId
            })
        }
    }, [roomFlag])

    useEffect(() => {
        socket.on("room-details", (roomDetails) => {
            console.log(roomDetails);
            dispatch(setRoom({
                "roomId": roomDetails._id,
                "roomName": roomDetails.name,
                "members": roomDetails.members
            }));
        })
    }, [])

    useEffect(() => {
        socket.on("message", (args: any) => {
            console.log(args);
            setMessages(args);
        })
    }, []);


    useEffect(() => {
        if(window.innerWidth > 675) {
            setIsSmViewPort(true)
        }
    }, []);

    useEffect(() => {
        if(messageSectionRef.current?.scrollTo) {
            messageSectionRef.current.scrollTop = messageSectionRef.current?.scrollHeight
        }
    });

    const sendMessage = () => {
        if(user.email) {
            socket.emit("send-message", {
                "message": {
                    "email": user.email,
                    "text": message
                },
                "roomId": room.roomId,
            });
            setMessage("");
        }
    }

    const handleGroupNameClick = () => {
        if(!isSmViewPort) {
            setMemberSection(true);
        }
    }

    const exitRoom = async() => {
        // exit room logic
        if(room.roomId && user.email) {
            try {
                const response = await axios.post("http://localhost:3001/room/exit", {
                    "userEmail":  user.email,
                    "roomId": room.roomId
                });
                if(response.data.status) {
                    navigate("/");
                }
            }
            catch(err) {}
        }
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            {
                !memberSection ?
                <div className="h-[90%] w-[92%] p-4 bg-[#303030] rounded-lg
                flex gap-3 max-sm:h-[95%] max-sm:w-[95%] max-sm:p-0">
                    {
                        isSmViewPort && <MemberList />
                    }
                    <div className="flex-1 flex flex-col gap-2 bg-[#242424] rounded-md p-2">
                        <div className="bg-[#303030] rounded pl-3 flex 
                        items-center justify-between">
                            <h1 className="text-xl cursor-pointer"
                            onClick={handleGroupNameClick}>
                                {
                                    room.roomName
                                }
                            </h1>
                            <h1 className="cursor-pointer flex items-center gap-2 
                            border-gray-600 border hover:border-red-400 p-3 rounded-md"
                            onClick={exitRoom}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-box-arrow-left"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>
                                Exit
                            </h1>
                        </div>

                        <div className="flex-1 rounded p-2 overflow-y-scroll"
                        ref={messageSectionRef}>
                            {
                                messages.map((mssg, idx) => (
                                    <Message message={mssg} 
                                    key={idx}/>
                                ))
                            }
                        </div>
                        
                        <div className="bg-[#303030] flex items-center gap-5">
                            <input type="text" placeholder="Message"
                            className="py-3 pl-5 w-[80%] bg-[#303030]" 
                            value={message} onChange={e => setMessage(e.target.value)}/>
                            <button className="bg-[#1A1A1A] p-3 px-5 
                            rounded-lg flex-1 flex items-center justify-center gap-3"
                            onClick={sendMessage}>
                                Send
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                : <MemberList memeberSectionFn={setMemberSection} />
            }
        </div>
    )
}

export default ChatRoom