import { CreateSaccoTypes, JoinSaccoTypes } from "@/types";
import Cookies from "js-cookie";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const environment = process.env. VITE_ENVIRONMENT;

export const useAddSacco = () => {
    const accessToken = Cookies.get('access-token');
    const SaccoRequest = async (saccoData: CreateSaccoTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sacco/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(saccoData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
        

    };

    const { mutateAsync: addSacco, isLoading, isError, isSuccess, error, reset } = useMutation(SaccoRequest);

    if (isSuccess) {
        toast.success("New Sacco Added!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        addSacco,
        isLoading,
        isError,
        isSuccess
    }
};

export const useGetSaccoList = () => {
    const accessToken = Cookies.get('access-token');
    
    const getAllSaccoList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sacco/list`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        const { allSaccoList} = responseData
        return allSaccoList;
    };

    const { data: allSaccoList , isLoading } = useQuery("allSaccoList", () => getAllSaccoList());

    return { allSaccoList, isLoading }
};


export const useGetjoinedSaccoList = () => {
    const accessToken = Cookies.get('access-token');
    
    const getJoinedSaccoList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sacco/findByUserId`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { joinedSaccoList} = responseData

        return joinedSaccoList;
    };

    const { data: joinedSaccoList, isLoading } = useQuery("joinedSaccoList", () => getJoinedSaccoList());

    return { joinedSaccoList, isLoading }
};


export const useJoinSacco = () => {
    const accessToken = Cookies.get('access-token');
    const JoinSaccoRequest = async (joinData: JoinSaccoTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sacco/join`, {
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

    const { mutateAsync: joinSacco, isLoading, isError, isSuccess, error, reset } = useMutation(JoinSaccoRequest);

    if (isSuccess) {
        toast.success("Joined Succesfully!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }
    
    return {
        joinSacco,
        isLoading,
        isError,
        isSuccess
    }
};