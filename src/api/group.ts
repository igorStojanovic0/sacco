import { CreateGroupTypes, GroupTypes, JoinedGroupTypes, JoinGroupTypes } from "@/types";
import Cookies from "js-cookie";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const environment = process.env. VITE_ENVIRONMENT;

export const useAddGroup = () => {
    const accessToken = Cookies.get('access-token');
    const GroupRequest = async (groupData: CreateGroupTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/group/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(groupData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
        

    };

    const { mutateAsync: addGroup, isLoading, isError, isSuccess, error, reset } = useMutation(GroupRequest);

    if (isSuccess) {
        toast.success("New Group Added!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        addGroup,
        isLoading,
        isError,
        isSuccess
    }
};

export const useGetGroupList = () => {
    const accessToken = Cookies.get('access-token');
    
    const getAllGroupList = async (): Promise<GroupTypes[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/group/list`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        const { groupList} = responseData
        return groupList;
    };

    const { data: groupList , isLoading } = useQuery("groupList", () => getAllGroupList());

    return { groupList, isLoading }
};


export const useGetjoinedGroupList = (userId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getJoinedGroupList = async (userId: string): Promise<JoinedGroupTypes[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/group/findByUserId?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { joinedGroupList} = responseData

        return joinedGroupList;
    };

    const { data: joinedGroupList, isLoading } = useQuery("joinedGroupList", () => getJoinedGroupList(userId));

    return { joinedGroupList, isLoading }
};


export const useJoinGroup = () => {
    const accessToken = Cookies.get('access-token');
    const JoinGroupRequest = async (joinData: JoinGroupTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/group/join`, {
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

    const { mutateAsync: joinGroup, isLoading, isError, isSuccess, error, reset } = useMutation(JoinGroupRequest);

    if (isSuccess) {
        toast.success("Joined Succesfully!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        joinGroup,
        isLoading,
        isError,
        isSuccess
    }
};