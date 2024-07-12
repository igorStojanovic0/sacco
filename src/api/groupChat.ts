import Cookies from "js-cookie";
import { useQuery } from 'react-query';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const useGetGroupChatMsg = (groupId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getGroupChatMsg = async (groupId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupChat/getMsgbyGroupId?groupId=${groupId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { groupChatMsg} = responseData

        return groupChatMsg;
    };

    const { data: groupChatMsg, isLoading } = useQuery("groupChatMsg", () => getGroupChatMsg(groupId));

    return { groupChatMsg, isLoading }
};
