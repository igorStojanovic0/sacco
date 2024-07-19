import { CreateGroupChannelTypes, GroupChannelTypes, JoinGroupTypes } from "@/types";
import Cookies from "js-cookie";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const environment = process.env. VITE_ENVIRONMENT;

export const useAddGroupChannel = () => {
    const accessToken = Cookies.get('access-token');
    const GroupChannelRequest = async (groupChannelData: CreateGroupChannelTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupChannel/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(groupChannelData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
        

    };

    const { mutateAsync: addGroupChannel, isLoading, isError, isSuccess, error, reset } = useMutation(GroupChannelRequest);

    if (isSuccess) {
        toast.success("New Channel Added!");
        // window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        addGroupChannel,
        isLoading,
        isError,
        isSuccess
    }
};

export const useGetGroupChannelList = (groupId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getAllGroupChannelList = async (groupId: string): Promise<GroupChannelTypes[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupChannel/list?groupId=${groupId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        const { groupChannelList} = responseData
        return groupChannelList;
    };

    const { data: groupChannelList , isLoading } = useQuery("groupChannelList", () => getAllGroupChannelList(groupId));

    return { groupChannelList, isLoading }
};


export const useGetjoinedGroupChannelList = () => {
    const accessToken = Cookies.get('access-token');
    
    const getJoinedGroupChannelList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupChannel/findByUserId`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { joinedGroupChannelList} = responseData

        return joinedGroupChannelList;
    };

    const { data: joinedGroupChannelList, isLoading } = useQuery("joinedGroupChannelList", () => getJoinedGroupChannelList());

    return { joinedGroupChannelList, isLoading }
};


export const useJoinGroupChannel = () => {
    const accessToken = Cookies.get('access-token');
    const JoinGroupChannelRequest = async (joinData: JoinGroupTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupChannel/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(joinData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
        

    };

    const { mutateAsync: joinGroupChannel, isLoading, isError, isSuccess, error, reset } = useMutation(JoinGroupChannelRequest);

    if (isSuccess) {
        toast.success("Joined Succesfully!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        joinGroupChannel,
        isLoading,
        isError,
        isSuccess
    }
};