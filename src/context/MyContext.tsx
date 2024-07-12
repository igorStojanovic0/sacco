import { JoinedGroupTypes } from "@/types";
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


type Props = {
    children: React.ReactNode;
}

type AddGroupMsg = {
    content: string,
    created: any,
    creatorId: string,
    groupId: string,
    roomId: string,
    surName: string,
    givenName: string,
    photograph: string,
    _id: string
}

type MyContextType = {
    //   showDate: any;
    //   setShowDate: (value: any) => void;
    //   showCaledarEventModal: boolean;
    //   setShowCalendarEventModal: (value: boolean) => void;
    //   datesEvents: any;
    //   setDatesEvents: (value: any) => void;
    //   setProfileEditData: (value: any) => void;
    //   profileEditData: any;
    //   calendarDateEvents : any;
    //   setCalendarDateEvents : (value: any) => void;
    isConnected: boolean;
    setConnected: (value: boolean) => void;
    msgEmit: (type: string, content: any) => void;
    roomEnter: (type: string, content: any) => void;
    sockets: any;
    addGroupMsg: AddGroupMsg;
    groupList: JoinedGroupTypes[]
    setGroupList: (value: JoinedGroupTypes[]) => void
    msgInputState: boolean;
    setMsgInputState: (value: boolean) => void;
};


const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: Props) => {
    //   const currentDate = new Date();
    //   const year = currentDate.getFullYear();
    //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //   const day = String(currentDate.getDate()).padStart(2, '0');
    //   const formattedDate = `${year}-${month}-${day}`;
    //   const [showDate, setShowDate] = useState(formattedDate);
    //   const [calendarDateEvents, setCalendarDateEvents] = useState([]);
    //   const [datesEvents, setDatesEvents] = useState([]);
    //   const [showCaledarEventModal, setShowCalendarEventModal] = useState(false);
    //   const [profileEditData, setProfileEditData] = useState([]);
    const [groupList, setGroupList] = useState<JoinedGroupTypes[]>([]);
    const [sockets, setSocket] = useState<Socket>()
    const [isConnected, setConnected] = useState(false)
    const [addGroupMsg, setAddGroupMsg] = useState<AddGroupMsg>({
        content: '',
        created: '',
        creatorId: '',
        groupId: '',
        roomId: '',
        surName: '',
        givenName: '',
        photograph: '',
        _id: ''
    })
    const [msgInputState, setMsgInputState] = useState<boolean>(false)
    const token = Cookies.get('access-token')

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    const connect = () => {
        setSocket(socket)
        socket.on("S2C_AUTH_AUTHORIZED", () => {
            setConnected(true)
        })

        socket.on("S2C_AUTH_UNAUHTORIZED", () => {
            setConnected(false)
        })

        socket.on("disconnect", () => [
            setConnected(false)
        ])

        socket.on("S2C_LOGGEDUSERS_USERS", (data) => {
            console.log("S2C_LOGGEDUSERS_USERS", data);
        })

        socket.on("connect", () => {
            socket.emit("C2S_AUTH_AUTHORIZATION", { token });
            console.log("connected");
        });
        
    };

    const msgEmit = (type: string, content: any) => {
        socket.emit(type, content);
    }

    const roomEnter = (type: string, roomId: any) => {
        socket.emit(type, roomId);
    }

    socket.on("S2C_GET_ALL_GROUP_MESSAGE", (data) => {
        console.log("S2C_GET_ALL_GROUP_MESSAGE", data);
        const { results } = data
        setAddGroupMsg(results[0])
    })

    useEffect(() => {
        connect()
        // socket.emit("C2S_GROUP_CHAT_ROOM_MESSAGE_NEW", {
        //         userId: 'userId',
        //         groupId: 'params',
        //         roomId: 'params',
        //         content: 'msgText',
        // })
    }, [])

    

    return (
        <MyContext.Provider
            value={{
                // showCaledarEventModal,
                // setShowCalendarEventModal,
                // profileEditData,
                // setProfileEditData,
                // datesEvents,
                // setDatesEvents,
                // showDate,
                // setShowDate,
                // calendarDateEvents,
                // setCalendarDateEvents
                sockets,
                isConnected,
                setConnected,
                msgEmit,
                roomEnter,
                addGroupMsg,
                setGroupList,
                groupList,
                msgInputState,
                setMsgInputState
            }}
        >
            {children}
        </MyContext.Provider>
    );
};
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};