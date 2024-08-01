"use client"

import { useGetGroupUserList } from '@/api/auth';
import { useGetGroupChatMsg } from '@/api/groupChat';
import { useMyContext } from '@/context/MyContext';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// export type Message = ['messages'][number];
type Message = {
  _id: string,
  creatorId: string,
  groupId: string,
  roomId: string,
  content: string,
  created: any,
  surName: string,
  givenName: string,
  photograph: string,
}


const FriendPage = () => {
  const [groupId, setGroupId] = useState<string | null>();
  const params = useParams()

  const { groupChatMsg } = useGetGroupChatMsg(params?.groupId as string)
  const { addGroupMsg, groupFriendRoomEnter, setMsgInputState, setMemberList } = useMyContext()
  const [addMsg, setaddMsg] = useState<Message[]>([])

  const [chatMsg, setChatMsg] = useState<Message[]>([])
  const { groupUserList } = useGetGroupUserList(params?.groupId as string)

  useEffect(() => {
    setGroupId(localStorage.getItem('groupId'));
  }, []);

  useEffect(() => {
    setaddMsg([...addMsg, addGroupMsg])
  }, [addGroupMsg])

  useEffect(() => {
    setaddMsg([])
  }, [params?.fId])

  useEffect(() => {
    const newMsg = groupChatMsg?.filter((msg: Message) => msg.roomId === `${params?.fId}`)
    setChatMsg(newMsg)
  }, [groupChatMsg])

  useEffect(() => {
    groupFriendRoomEnter('C2S_GROUP_FRIEND_CHAT_ROOM_USER_ENTER', `${params?.fId}`)
    setMsgInputState(true)
  }, [])

  useEffect(() => {
    setMemberList(groupUserList)
  }, [groupUserList])

  return (

    <>
      <div className='flex-1 overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        {chatMsg?.map((message: Message, i: number) => (
          <div key={message._id}>
            {/* {i === 0 || message.user !== channel.messages[i - 1].user ? ( */}
            <MessageWithUser message={message} />
            {/* ) : (
                     <Message message={message} />
                     )} */}
          </div>
        ))}

        {(addMsg.length > 0) && addMsg?.map((message: Message, i: number) => (
          <div key={message._id}>
            <MessageWithUser message={message} />
          </div>
        ))}
      </div>
    </>
  )
}

export default FriendPage

function MessageWithUser({ message }: { message: Message }) {
  return (
    <div className='mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <img
        className='mr-4 mt-0.5 h-10 w-10 rounded-full'
        src={(message?.photograph === 'default' || !message?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${message?.photograph}`}
        width={40}
        height={40}
        alt=''
      />
      <div>
        <p className='flex items-baseline'>
          <span className='mr-2 text-[15px] font-medium text-black'>
            {message.surName}
          </span>
          <span className='text-xs font-semibold text-[#414d70]'>
            {/* {message?.created} */}
            {moment(message?.created).format("MM/DD/YYYY HH:MM ")}
          </span>
        </p>
        <p className='text-[#414d70]'>{message?.content}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: Message }) {
  return (
    <div className='py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <p className='pl-14 text-black'>{message.content}</p>
    </div>
  );
}
