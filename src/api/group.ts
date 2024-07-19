import { CreateGroupTypes, GroupTypes, JoinGroupTypes } from "@/types";
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
        const { allGroupList} = responseData
        return allGroupList;
    };

    const { data: allGroupList , isLoading } = useQuery("allGroupList", () => getAllGroupList());

    return { allGroupList, isLoading }
};


export const useGetjoinedGroupList = () => {
    const accessToken = Cookies.get('access-token');
    
    const getJoinedGroupList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/group/findByUserId`, {
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

    const { data: joinedGroupList, isLoading } = useQuery("joinedGroupList", () => getJoinedGroupList());

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