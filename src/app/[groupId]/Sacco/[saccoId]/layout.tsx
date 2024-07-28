"use client"
import { useGetjoinedSaccoList, useGetSaccoUserList } from '@/api/sacco';
import * as Icons from '@/components/group/icons';
import SaccoTopBar from '@/components/sacco/component/SaccoTopBar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMyContext } from '@/context/MyContext';
import styles from "@/styles/Channels.module.css";
import { SaccoTypes, User } from '@/types';
import { Divider } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function EachSaccoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { joinedSaccoList } = useGetjoinedSaccoList()
    const [selectedSacco, setSelectedSacco] = useState<SaccoTypes | undefined>()
    const [saccoMemberListFlag, setSaccoMemberListFlag] = useState<boolean>(false)
    const params = useParams()

    const { setLoggedUser } = useMyContext()
    const [memberList, setMemberList] = useState<User[]>([])
    const { saccoUserList } = useGetSaccoUserList(params?.saccoId as string)

    const [userId, setUserId] = useState<string | null>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let user_id = window.localStorage.getItem('user')
            setUserId(user_id)
        }
      }, []);

    useEffect(() => {
        setMemberList(saccoUserList)
    }, [saccoUserList])

    useEffect(() => {
        const temp = joinedSaccoList?.filter((sacco: SaccoTypes) => sacco.sacco_id === params.saccoId)[0]
        setSelectedSacco(temp)
    }, [joinedSaccoList])

    if (memberList) {
        const user = memberList?.filter((member) => member?.user_id === userId)[0]
        setLoggedUser(user as User)
    }

    return (
        <>
            <div className='flex min-w-0 flex-1 flex-shrink flex-col bg-[#e9e9f5] text-black'>
                <div className='flex h-12 items-center px-2 shadow-md shadow-black text-gray-700'>
                    <div className='flex items-center'>
                        <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
                        <span className='mr-2 whitespace-nowrap font-title text-black'>
                            {selectedSacco?.name}
                        </span>
                    </div>
                    <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block'></div>
                            {/* <div className='mx-2 hidden truncate text-sm font-medium  md:block'>
                                {channelTitle}
                            </div> */}
                    {/* {selectedFriend && (
                        <>
                            <Avatar className="overflow-visible !w-7 !h-7">
                                <div className="absolute top-5 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#d4d6f3]" />
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
                    )} */}
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
                        <Link href={`/${params?.groupId}/Sacco/${params?.saccoId}/approve`} className='text-white bg-gray-800 hover:bg-gray-400 hover:text-black  rounded-lg  w-28 py-1 items-center justify-center text-center'>
                            Approve
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
                        <button className=' hover:text-gray-800' onClick={() => setSaccoMemberListFlag(!saccoMemberListFlag)}>
                            <Icons.People className='mx-2 h-6 w-6'/>
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
                            <div className="flex flex-col w-full bg-slate-100 overflow-y-scroll">
                                <SaccoTopBar />
                                <div className="p-5">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                    {saccoMemberListFlag && (
                        <div className='scrollbar-thin scrollbar-thumb-rounded absolute right-0 w-1/6 bg-[#e1e4f5] pt-5 h-[calc(94vh)]  overflow-y-scroll scroll-m-10' style={{ direction: 'rtl', scrollbarColor: 'red' }}>
                            {memberList?.map((user: any) => (
                                <div
                                    key={user._id}
                                    className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
                                hover:bg-[#d5d9fa]  
                            `}

                                    // onClick={() => { setSelectedUser(user as User); setMemeberProfileFlag(!memberProfileFlag) }}
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
                    {/* {memberProfileFlag && (
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
                    )} */}
                </div>
            </div>
            {/* {children} */}
        </>
    )
}