import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

type GroupMemberPropType = {
    "username": string,
    "profileImage": string
}

function GroupMember(data: GroupMemberPropType) {
    return (
        <div className="bg-[#242424] py-3 pl-3 rounded cursor-pointer mb-2
        flex items-center gap-3">
            <img src={data.profileImage} className="h-10 rounded-full" />
            <h1>{data.username}</h1>
        </div>
    )
}

function MemberList(props: any) {

    const [roomId, setRoomId] = useState<string>("#####");
    const [copyToClipBoardAlert, setCopyToClipBoardAlert] = useState<boolean>(false);
    const [members, setMembers] = useState<GroupMemberPropType[]>([]);

    const room = useSelector((state: RootState) => state.room);

    const getMemberList = async() => {
        const response = await axios.post("https://group-chat-app-poq9.onrender.com/user/details", {
            "users": room.members
        })
        console.log(response.data);
        setMembers(response.data);
    }

    useEffect(() => {
        if(room.roomId) {
            setRoomId(room.roomId);
        }
    }, [room]);

    useEffect(() => {
        if(room.members.length > 0) getMemberList();
    }, [room.members])

    const copyToClipBoard = () => {
        setCopyToClipBoardAlert(true);
        navigator.clipboard.writeText(roomId);
        setTimeout(() => {
            setCopyToClipBoardAlert(false);
        }, 1800);
    }

    const closeMemberList = () => {
        if(window.innerWidth < 675) {
            props.memeberSectionFn(false);
        }
    }

    return (
        <div className="h-full w-[20%] pr-4 max-sm:w-full max-sm:p-3">
            <div className="flex gap-4">
                <div className="bg-white text-black cursor-pointer
                flex items-center justify-center rounded-lg relative 
                bg-opacity-85 mb-8 flex-1"
                onClick={copyToClipBoard}>
                    <h1 className="p-2 text-sm">{roomId}</h1>
                    {
                        copyToClipBoardAlert ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                        fill="currentColor" className="bi bi-clipboard-check" 
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg> 
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                        fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                    }
                    
                    {
                        copyToClipBoardAlert
                        &&
                        <h1 className="absolute top-[-65%] bg-gray-400 p-2 rounded-md 
                        opacity-85 bg-opacity-75">
                            Copied to clipboard
                        </h1>
                    }
                </div>
                <div className="sm:hidden" onClick={closeMemberList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </div>
            <div className="h-[85%] overflow-y-scroll">
                {
                    members.map((member, index) => (
                        <GroupMember 
                        profileImage={member?.profileImage} 
                        username={member?.username}
                        key={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MemberList