import Cookies from "js-cookie";
import { useQuery } from 'react-query';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const useGetGroupFriendChatMsg = (roomId: string, groupId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getGroupFriendChatMsg = async (roomId: string, groupId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupUserFriend/getFriendMsgbyroomId`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                roomId: roomId,
                groupId: groupId
            }),
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { groupFriendChatMsg} = responseData

        return groupFriendChatMsg;
    };

    const { data: groupFriendChatMsg, isLoading } = useQuery("groupFriendChatMsg", () => getGroupFriendChatMsg(roomId, groupId));

    return { groupFriendChatMsg, isLoading }
};
