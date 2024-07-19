"use client"
import { useGetGroupFriendList, useGetGroupUserList, useGetProfileData } from '@/api/auth';
import { useGetjoinedGroupChannelList } from '@/api/channel';
import MessageInput from '@/components/group/components/MessageInput';
import { UserSection } from '@/components/group/components/UserSection';
import GroupChannelCreateDialog from '@/components/group/groupChannelCreateDialog';
import * as Icons from '@/components/group/icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMyContext } from '@/context/MyContext';
import styles from "@/styles/Channels.module.css";
import { FriendTypes, GroupChannelTypes, User } from '@/types';
import { Divider } from '@mui/material';
import { EditIcon, MailIcon, MessageCircle, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';


export default function GroupMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    let userId = localStorage.getItem('user')
    const { groupList, selectedGroupId, setSelectedGroupId, setLoggedUser, addFriend, newFriend, groupEnter, msgInputState, setMsgInputState, memberList, sendMsgRoomId, setSendMsgRoomId, sendMsgGroupId } = useMyContext()
    const { currentUser } = useGetProfileData()

    let params = useParams();

    let group = groupList?.find((group) => group?.group_id.toString() === params.groupId)
    const { joinedGroupChannelList } = useGetjoinedGroupChannelList()
    const { groupUserList } = useGetGroupUserList(params?.groupId as string)
    const { groupFriendList } = useGetGroupFriendList(params?.groupId as string)
    const [memberListFlag, setMemeberListFlag] = useState<boolean>(false)
    const [memberProfileFlag, setMemeberProfileFlag] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<User>()
    const [channelTitle, setChannelTitle] = useState<string>('')

    const [friendList, setfriendList] = useState<FriendTypes[]>([])
    const [selectedFriend, setSelectedFriend] = useState<FriendTypes | null>()

    useEffect(() => {
        setfriendList(groupFriendList)
    }, [groupFriendList, groupFriendList !== undefined])

    useEffect(() => {
        setfriendList([...friendList, newFriend])
    }, [newFriend, newFriend !== undefined || newFriend !== 'undefined'])

    const router = useRouter()

    useEffect(() => {
        groupEnter('C2S_GROUP_USER_ENTER', `${params?.groupId}`)
        setSelectedGroupId(params.groupId as string)
    }, [])

    useEffect(() => {
        if (params?.wId) {
            groupUserList?.map((user: any) => {
                if ((params?.wId === '1' || params?.wId === '2') && (user?.user_id === userId)) {
                    if (user?.role_name === 'GroupUser') {
                        setMsgInputState(false)
                    } else {
                        setMsgInputState(true)
                    }

                }
            })
        }
    }, [groupUserList !== undefined, params, groupUserList])

    useEffect(() => {

    }, [groupUserList])
    if (!group) {
        return null;
    }

    // if (params?.fId) {
    //     setChannelTitle('')
    // } else if (params?.wId) {
    //     setSelectedFriend(null)

    // } else if (params?.cId) {
    //     setSelectedFriend(null)
    // }

    if (memberList) {
        const user = memberList?.filter((member) => member?.user_id === userId)[0]
        setLoggedUser(user as User)
    }

    const onCheckFriendList = () => {
        const existingFriend = friendList?.filter((friend: FriendTypes) => friend?.friendId === selectedUser?.user_id)[0]
        if (existingFriend) {
            setSelectedFriend(existingFriend as any)
            router.push(`/Groups/${params?.groupId}/friend/${existingFriend?.roomId}`)

        } else {
            addFriend(userId as string, selectedUser?.user_id as string, params?.groupId as string)
            // if (newFriend) {
            setSelectedFriend(newFriend)
            router.push(`/Groups/${params?.groupId}/friend/${currentUser?._id}${selectedUser?.user_id}`)
            // }
        }
        setMemeberProfileFlag(false)
    }

    return (
        <>
            <div className='w-60 flex-col bg-[#d4d6f3] md:flex hidden !text-black'>

                <button className='bg-[#bfc0e7] flex h-12 items-center px-4 font-title text-[15px] font-semibold text-black shadow-sm transition hover:bg-gray-550/[0.16]'>
                    <div className='relative mr-1 h-4 w-4'>
                        <Icons.Verified className='absolute h-4 w-4 text-gray-550' />
                        <Icons.Check className='absolute h-4 w-4' />
                    </div>
                    {group?.group_name}
                    <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
                </button>
                <div className='flex-1 space-y-[15px] overflow-hidden pt-3 font-medium text-black'>
                    <div>
                        <button
                            // onClick={() => toggleCategory(category.id)}
                            className='flex w-full items-center px-2 font-title text-xs uppercase tracking-wide hover:text-gray-100'
                        >
                            Welcome
                        </button>
                        <div className='mt-[5px] space-y-0.5'>
                            <Link
                                href={`/Groups/${params?.groupId}/welcome/1`}
                                className={`group relative mx-2 flex items-center rounded px-2 py-1 hover:bg-[##9da3ff] ${channelTitle === 'Rule' ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"} `}
                                onClick={() => {
                                    setChannelTitle('Rule')
                                    setSendMsgRoomId(sendMsgRoomId?.filter((roomId) => roomId !== `${sendMsgGroupId}1`))
                                }}
                            >
                                {/* {state === 'inactiveUnread' && ( */}
                                <div className='absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white'></div>
                                {/* )} */}
                                <Icons.Hashtag className='mr-1.5 h-5 w-5 text-black' />
                                Rule
                                {sendMsgRoomId?.includes(`${sendMsgGroupId}1`) && (
                                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
                                )}
                                <Icons.AddPerson className='ml-auto h-4 w-4 text-black opacity-0 hover:text-gray-800 group-hover:opacity-100' />
                            </Link>
                            <Link
                                href={`/Groups/${params?.groupId}/welcome/2`}
                                className={`group relative mx-2 flex items-center rounded px-2 py-1 hover:bg-[#9da3ff] ${channelTitle === 'Announcement' ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"}`}
                                onClick={() => {
                                    setChannelTitle('Announcement')
                                    setSendMsgRoomId(sendMsgRoomId?.filter((roomId) => roomId !== `${sendMsgGroupId}2`))
                                }}
                            >
                                {/* {state === 'inactiveUnread' && ( */}
                                {/* <div className='absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white'></div> */}
                                {/* )} */}
                                <Icons.Hashtag className='mr-1.5 h-5 w-5 text-black' />
                                Announcement
                                {sendMsgRoomId?.includes(`${sendMsgGroupId}2`) && (
                                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
                                )}
                                <Icons.AddPerson className='ml-auto h-4 w-4 text-black opacity-0 hover:text-gray-800 group-hover:opacity-100' />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-start rounded-lg py-2 hover:bg-[#9da3ff]"
                                    >
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium"> PROFILE </span>


                                    </summary>

                                    <ul className=" px-2">
                                        <li>
                                            <Link href="#" className={`flex rounded-lg px-4 py-2 font-medium hover:bg-[#9da3ff]  ${channelTitle === 'Main Info' ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"}`} onClick={() => setChannelTitle('Main Info')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Main Info
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href={`/Groups/${params?.groupId}/profile/membership`} className={`flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]  ${channelTitle === 'Membership Info' ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"}`} onClick={() => setChannelTitle('Membership Info')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Membership Info
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className={`flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff] `} onClick={() => setChannelTitle('Activity&Engagement')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Activity&Engagement
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]" onClick={() => setChannelTitle('Administrative Info')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Administrative Info
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="#" className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]" onClick={() => setChannelTitle('Communication Tools')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Communication Tools
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]" onClick={() => setChannelTitle('Integration Info')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Integration Info
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]" onClick={() => setChannelTitle('Security&Compliance')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Security&Compliance
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex rounded-lg px-4 py-2  font-medium hover:bg-[#9da3ff]" onClick={() => setChannelTitle('Analytics&Reporting')}>
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                Analytics&Reporting
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-start rounded-lg py-2 hover:bg-[#9da3ff]"
                                    >
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium"> CHANNELS </span>
                                    </summary>
                                    <ul className=" px-2">
                                        <li>
                                            <Link href={`/Groups/${params?.groupId}/channels/3`}
                                                className={`flex rounded-lg px-4 py-2 font-medium hover:bg-[#9da3ff] ${channelTitle === 'General' ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"}`}
                                                onClick={() => {
                                                    setChannelTitle('General')
                                                    setSendMsgRoomId(sendMsgRoomId?.filter((roomId) => roomId !== `${sendMsgGroupId}3`))
                                                }}
                                            >
                                                <Icons.Hashtag className='mr-1 h-5 w-5 text-gray-400' />
                                                General
                                                {sendMsgRoomId?.includes(`${sendMsgGroupId}3`) && (
                                                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
                                                )}
                                                <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
                                            </Link>
                                        </li>
                                        {joinedGroupChannelList?.map((channel: GroupChannelTypes) => (
                                            <li key={channel?._id}>
                                                <Link href={`/Groups/${params?.groupId}/channels/${channel?._id}`}
                                                    className={`flex rounded-lg px-4 py-2 font-medium hover:bg-[#9da3ff] ${channelTitle === channel?.name ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"}`}
                                                    onClick={() => {
                                                        setChannelTitle(channel?.name)
                                                        setSendMsgRoomId(sendMsgRoomId?.filter((roomId) => roomId !== `${sendMsgGroupId}${channel?._id}`))
                                                    }}
                                                >
                                                    <Image className='rounded-3xl mr-2' width={20} height={20} src={(channel?.channel_avatar === 'default' || !channel?.channel_avatar) ? '/servers/mirage.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${channel?.channel_avatar}`} alt='group' />
                                                    {channel?.name}
                                                    {sendMsgRoomId?.includes(`${sendMsgGroupId}${channel?._id}`) && (
                                                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
                                                    )}
                                                    <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <GroupChannelCreateDialog currentUser={currentUser} />
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-start rounded-lg py-2 hover:bg-[#9da3ff]"
                                    >
                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium"> DIRECT MESSAGES </span>
                                    </summary>
                                    <ul className=" px-5">
                                        {friendList?.map((friend: FriendTypes) => (
                                            <li key={friend?._id} onClick={() => {
                                                setSelectedFriend(friend)
                                                router.push(`/Groups/${params?.groupId}/friend/${friend?.roomId}`)
                                                setSendMsgRoomId(sendMsgRoomId?.filter((roomId) => roomId !== `${friend.roomId}`))
                                            }}>
                                                <div
                                                    className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
                                                                transition-all ease-in-out duration-300
                                                                hover:bg-[#9da3ff]
                                                                ${selectedFriend?.friendId === friend?.friendId ? "bg-[#9da3ff]" : "bg-[#d4d6f3]"} 
                                                            `}

                                                >
                                                    <Avatar className="overflow-visible !w-7 !h-7">

                                                        {/* {friend?.is_active && ( */}
                                                        <div className="absolute top-5 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#d4d6f3]" />
                                                        {/* )} */}

                                                        <AvatarImage
                                                            src={(friend?.photograph === 'default' || !friend?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${friend?.photograph}`}
                                                            className="rounded-full object-cover"
                                                        />
                                                        <AvatarFallback>
                                                            <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="w-full ">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-md font-medium">
                                                                {friend?.surName || friend?.email?.split("@")[0]}
                                                            </p>
                                                        </div>

                                                    </div>
                                                    {sendMsgRoomId?.includes(`${friend.roomId}`) && (
                                                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[#d4d6f3]" />
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="#" className="flex rounded-lg px-2 py-2 font-medium hover:bg-gray-600 justify-start items-center">
                                                <Icons.Plus className='mr-1 h-4 w-4 text-gray-400' />
                                                New Coworker
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>

                </div>
                <UserSection />
            </div>
            <div className='flex min-w-0 flex-1 flex-shrink flex-col bg-[#e9e9f5] text-black'>
                <div className='flex h-12 items-center px-2 shadow-md shadow-black text-gray-700'>
                    <div className='flex items-center'>
                        <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
                        <span className='mr-2 whitespace-nowrap font-title text-black'>
                            {group?.group_name}
                        </span>
                    </div>

                    {group?.description && (
                        <>
                            <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block'></div>
                            <div className='mx-2 hidden truncate text-sm font-medium  md:block'>
                                {group?.description}
                            </div>
                        </>
                    )}
                    <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block'></div>
                    <div className='mx-2 hidden truncate text-sm font-medium  md:block'>
                        {channelTitle}
                    </div>
                    {selectedFriend && (
                        <>
                            <Avatar className="overflow-visible !w-7 !h-7">
                                {/* {friend?.is_active && ( */}
                                <div className="absolute top-5 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#d4d6f3]" />
                                {/* )} */}
                                <AvatarImage
                                    src={(selectedFriend?.photograph === 'default' || !selectedFriend?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${selectedFriend?.photograph}`}
                                    className="rounded-full object-cover"
                                />
                                <AvatarFallback>
                                    <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full ml-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-md font-medium">
                                        {selectedFriend?.surName} {selectedFriend?.givenName}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    {/* Mobile buttons */}
                    <div className='ml-auto flex items-center md:hidden'>
                        <button className=' hover:text-gray-800'>
                            <Icons.HashtagWithSpeechBubble className='mx-2 h-6 w-6' />
                        </button>
                        <button className=' hover:text-gray-800'>
                            <Icons.People className='mx-2 h-6 w-6' />
                        </button>
                    </div>

                    {/* Desktop buttons */}
                    <div className='ml-auto hidden items-center md:flex'>
                        <Link href={`/${params?.groupId}/Sacco`} target='blank' className='text-white bg-gray-800 hover:bg-gray-400 hover:text-black rounded-lg gap-3 w-28 py-1 items-center mr-3 justify-center text-center'>
                            Sacco
                        </Link>
                        <Link href={`#`} className='text-white bg-gray-800 hover:bg-gray-400 hover:text-black  rounded-lg  w-28 py-1 items-center justify-center text-center'>
                            BF
                        </Link>
                        <button className=' hover:text-gray-800'>
                            <Icons.HashtagWithSpeechBubble className='mx-2 h-6 w-6' />
                        </button>
                        <button className=' hover:text-gray-800'>
                            <Icons.Bell className='mx-2 h-6 w-6' />
                        </button>
                        <button className=' hover:text-gray-800'>
                            <Icons.Pin className='mx-2 h-6 w-6' />
                        </button>
                        <button className=' hover:text-gray-800' onClick={() => setMemeberListFlag(!memberListFlag)}>
                            <Icons.People className='mx-2 h-6 w-6' />
                        </button>
                        <div className='relative mx-2'>
                            <input
                                type='text'
                                placeholder='Search'
                                className='h-6 w-36 rounded border-none bg-gray-500 px-1.5 text-sm font-medium placeholder-gray-400'
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center'>
                                <Icons.Spyglass className='mr-1.5 h-4 w-4 text-gray-400' />
                            </div>
                        </div>
                        <button className=' hover:text-gray-800'>
                            <Icons.Inbox className='mx-2 h-6 w-6' />
                        </button>
                        <button className=' hover:text-gray-800'>
                            <Icons.QuestionCircle className='mx-2 h-6 w-6' />
                        </button>
                    </div>
                </div>
                <Divider className='bg-gray-300' />
                <div className={`${styles.content} relative`}>
                    <main className={`${styles.main} `}>
                        <div className={`${styles.messagesWrapper} bg-[#eae9f4]`}>
                            {children}
                        </div>
                        {msgInputState && (
                            <MessageInput />
                        )}

                    </main>
                    {memberListFlag && (
                        <div className='scrollbar-thin scrollbar-thumb-rounded absolute right-0 w-1/6 bg-[#e1e4f5] pt-5 h-[calc(87vh)]  overflow-y-scroll scroll-m-10' style={{ direction: 'rtl', scrollbarColor: 'red' }}>
                            {/* <div style={{ direction: 'rtl', overflowY: 'scroll', height: '100%' }}> */}
                            {memberList?.map((user: any) => (
                                <div
                                    key={user._id}
                                    className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
                                hover:bg-[#d5d9fa]  
                            `}

                                    onClick={() => { setSelectedUser(user as User); setMemeberProfileFlag(!memberProfileFlag) }}
                                >
                                    <div className="w-full ">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-gray-700 p-1 rounded-lg w-1/2 justify-center text-center">
                                                {user?.role_name}
                                            </span>
                                            <p className="text-md font-medium">
                                                {user.surName || user.email.split("@")[0]}
                                            </p>

                                        </div>
                                    </div>
                                    <Avatar className="overflow-visible">
                                        {user?.is_active && (
                                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground" />
                                        )}

                                        <AvatarImage
                                            src={(user?.photograph === 'default' || !user?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${user?.photograph}`}
                                            className="rounded-full object-cover"
                                        />
                                        <AvatarFallback>
                                            <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                                        </AvatarFallback>
                                    </Avatar>


                                </div>
                            ))}
                        </div>
                    )}
                    {memberProfileFlag && (
                        <div className='absolute w-1/3 right-0 bg-[#e1e4f5] h-[calc(100vh-50px)]'>
                            <div className='justify-between flex p-5'>
                                <span className='text-3xl'>Profile</span>
                                <button onClick={() => setMemeberProfileFlag(false)}><AiFillCloseCircle fontSize={30} /></button>
                            </div>
                            <div className=' w-full flex items-center text-center justify-center align-middle h-[250px] overflow-hidden'>
                                <div className='w-[250px] h-[250px] rounded-lg'>
                                    <Image className='rounded-lg overflow-hidden' src={(selectedUser?.photograph === 'default' || !selectedUser?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${selectedUser?.photograph}`} alt='user profile' width={250} height={250} />
                                </div>
                            </div>
                            <div className='justify-start flex p-5'>
                                <span className='text-3xl'>{selectedUser?.surName} {selectedUser?.givenName}</span>
                            </div>
                            <div className='justify-between w-full flex p-5 gap-3'>
                                {userId === selectedUser?.user_id ? (
                                    <>
                                        <button
                                            className='border-white border-2 px-20 py-2 rounded-lg hover:bg-gray-500 flex items-center text-center gap-2'>Set a Status</button>
                                        <button
                                            className='border-white border-2 px-20 py-2 rounded-lg hover:bg-gray-500 flex items-center text-center gap-2'><EditIcon />Edit</button>
                                    </>

                                ) : (
                                    <>
                                        <button
                                            onClick={onCheckFriendList}
                                            className='border-white border-2 px-20 py-2 rounded-lg hover:bg-gray-500 flex items-center text-center gap-2'><MessageCircle /> Message</button>
                                        <button
                                            className='border-white border-2 px-20 py-2 rounded-lg hover:bg-gray-500 flex items-center text-center gap-2'><VideoIcon /> Video</button>
                                    </>
                                )}

                            </div>
                            <Divider className='h-1.5' />
                            <div className='p-5 text-2xl'>
                                Contact Information
                            </div>
                            <div className='flex p-7 items-center gap-2'>
                                <div>
                                    <MailIcon />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-[13px]'>Email Address</span>
                                    <span className='text-blue-500 cursor-pointer'>{selectedUser?.email}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


const CustomScrollbar = () => (
    <style jsx>{`
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #e1e4f5;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #00a884;
        border-radius: 10px;
        border: 2px solid #e1e4f5;
      }
    `}</style>
);