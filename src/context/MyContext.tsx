import { FriendTypes, JoinedGroupTypes, User } from "@/types";
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
    isConnected: boolean;
    setConnected: (value: boolean) => void;
    msgEmit: (type: string, content: any) => void;
    groupRoomEnter: (type: string, content: any) => void;
    userEnter: (type: string, content: any) => void;
    groupEnter: (type: string, content: any) => void;
    groupFriendRoomEnter: (type: string, content: any) => void;
    groupChannelRoomEnter: (type: string, content: any) => void;
    sockets: any;
    addGroupMsg: AddGroupMsg;
    groupList: JoinedGroupTypes[] | undefined
    setGroupList: (value: JoinedGroupTypes[] | undefined) => void
    msgInputState: boolean;
    setMsgInputState: (value: boolean) => void;
    addFriend: (userId: string, friendId: string, groupId: string) => void;
    newFriend: FriendTypes;
    memberList: User[];
    setMemberList: (value: User[]) => void;
    groupNotificationFlag: boolean;
    setGroupNotificationFlag: (value: boolean) => void;
    sendMsgGroupId: string;
    setSendMsgGroupId: (value: string) => void;
    sendMsgRoomId: string[];
    setSendMsgRoomId: (value: string[]) => void;
    loggedUser?: User | null;
    setLoggedUser: (value: User | null) => void;
    selectedGroupId: string | undefined;
    setSelectedGroupId: (value: string | undefined) => void;
    saccoStep: number;
    setSaccoStep: (value: number) => void;
    saccoCategory: number;
    setSaccoCategory: (value: number) => void;
    saccoTopBar: string;
    setSaccoTopBar: (value: string) => void;

};


const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: Props) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [groupList, setGroupList] = useState<JoinedGroupTypes[] | undefined>([]);
    const [memberList, setMemberList] = useState<User[]>([]);
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
    const [newFriend, setNewFriend] = useState<FriendTypes>({
        _id: '',
        title: '',
        surName: '',
        givenName: '',
        otherNames: '',
        photograph: '', 
        gender: 'Male',
        tribe: '',
        religion: '',
        placeOfBirth: '',
        currentParish: '',
        birthday: new Date(),
        nationalIDNumber: '',
        nationalIDPhoto: '',
        phone: '',
        email: '',
        homeAddress: '',
        homeLocation: '',
        districtOfBirth: '',
        birthParish: '',
        birthVillage: '',
        birthHome: '',
        maritalStatus: '',
        profession: '',
        placeOfWorkAddress: '',
        userID: '',
        is_active: false,
        userId: '',
        friendId: '',
        groupId: '',
        roomId: '',
        role_name: '',
    })
    const [msgInputState, setMsgInputState] = useState<boolean>(false)
    const [groupNotificationFlag, setGroupNotificationFlag] = useState<boolean>(false)
    const [sendMsgGroupId, setSendMsgGroupId] = useState<string>('')
    const [sendMsgRoomId, setSendMsgRoomId] = useState<string[]>([])
    const token = Cookies.get('access-token')
    const [loggedUser, setLoggedUser] = useState<User | null>(null)

    const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>()

    const [saccoStep, setSaccoStep] = useState<number>(0);
    const [saccoCategory, setSaccoCategory] = useState<number>(1);

    const [saccoTopBar, setSaccoTopBar] = useState('')
    
    useEffect(() => {
        setUserId(localStorage.getItem('user'))
    },[])
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
    
    const userEnter = (type: string, user: string) => {
        socket.emit(type, user);
    }

    const groupEnter = (type: string, groupId: string) => {
        socket.emit(type, groupId);
    }

    const groupRoomEnter = (type: string, groupRoomId: any) => {
        socket.emit(type, groupRoomId);
    }

    const groupFriendRoomEnter = (type: string, groupFriendRoomId: string) => {
        socket.emit(type, groupFriendRoomId);
    }

    const groupChannelRoomEnter = (type: string, groupChannelRoomId: string) => {
        socket.emit(type, groupChannelRoomId);
    }

    socket.on("S2C_GET_ALL_GROUP_MESSAGE", (data) => {
        const { results } = data
        setAddGroupMsg(results[0])
    })

    const addFriend = (userId: string, friendId: string, groupId: string) => {
        socket.emit('C2S_ADD_FRIEND', { userId: userId, friendId: friendId, groupId: groupId })
    }

    socket.on('S2C_ADD_FRIEND', (data) => {
        const { friend } = data
        if(friend[0] !== undefined || friend[0] !== 'undefined') {
            setNewFriend(friend[0])
        } else {
            return
        }
        console.log("S2C_ADD_FRIEND", friend[0]);
    })

    useEffect(() => {
        connect()
    }, [])

    socket.on("S2C_SEND_ALL_USER_MESSAGE", (data) => {
        const { results } = data
        const msg = results[0]
        if(msg?.creatorId === userId) {
            setSendMsgGroupId('')
            // setSendMsgRoomId([])
        } else {
            setSendMsgGroupId(msg?.groupId)
            setGroupNotificationFlag(true)
            sendMsgRoomId.push(msg?.roomId)
        }
    })

    return (
        <MyContext.Provider
            value={{
                sockets,
                isConnected,
                setConnected,
                msgEmit,
                groupRoomEnter,
                userEnter,
                groupEnter,
                groupFriendRoomEnter,
                groupChannelRoomEnter,
                addGroupMsg,
                setGroupList,
                groupList,
                msgInputState,
                setMsgInputState,
                addFriend,
                newFriend,
                memberList,
                setMemberList,
                groupNotificationFlag,
                setGroupNotificationFlag,
                sendMsgGroupId,
                setSendMsgGroupId,
                sendMsgRoomId,
                setSendMsgRoomId,
                loggedUser,
                setLoggedUser,
                selectedGroupId,
                setSelectedGroupId,
                saccoStep,
                setSaccoStep,
                saccoCategory,
                setSaccoCategory,
                saccoTopBar,
                setSaccoTopBar
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