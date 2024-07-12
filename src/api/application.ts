import { ApplicationFormData } from '@/components/forms/AddApplicationForm';
import { Application, UpdateApplicationTypes } from "@/types";
import Cookies from "js-cookie";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = "http://localhost:3001"

export const useSubmitApplication = () => {
    const submitApplicationRequest = async (application: ApplicationFormData) => {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/application/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: submitApplication, isLoading, isSuccess, error } = useMutation(submitApplicationRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        submitApplication,
        isLoading,
        isSuccess
    }
};

export const useGetUserApplications = () => {
    const accessToken = Cookies.get('access-token');
    
    const getAllUserApplicationsRequest = async (): Promise<Application> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/application/findByUser`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    };

    const { data: userApplications, isLoading } = useQuery("applicationInfo", () => getAllUserApplicationsRequest());

    return { userApplications, isLoading }
};

export const useGetLoanApplicationData = (loanId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getApplicationRequest = async (loanId:string): Promise<Application> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/application/findById?id=${loanId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    };

    const { data: currentApplication, isLoading } = useQuery("applicationInfo", () => getApplicationRequest(loanId));

    return { currentApplication, isLoading }
};

export const useUpdateApplication = () => {
    const updateApplicationRequest = async (application: UpdateApplicationTypes) => {
        const accessToken = Cookies.get('access-token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/application/update?id=${application._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    }

    const { mutateAsync: updateApplication, isLoading, isSuccess, error, reset } = useMutation(updateApplicationRequest);

    if (isSuccess) {
        toast.success("Application updated!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        updateApplication,
        isLoading
    }
};

export const useDeleteApplication = () => {
    const updateApplicationApplicationRequest = async (applicationId: string) => {
        const accessToken = Cookies.get('access-token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/application/delete?id=${applicationId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json', 
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    }

    const { isLoading, isSuccess, error, reset } = useMutation(updateApplicationApplicationRequest);

    if (isSuccess) {
        toast.success("Application deleted!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        isLoading
    }
};