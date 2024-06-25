import { CreateRoleTypes } from "@/types";
import { useMutation } from 'react-query';
import { toast } from 'sonner';

// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const API_BASE_URL = 'http://localhost:3001';
const environment = process.env. VITE_ENVIRONMENT;

export const useAddRole = () => {
    const RoleRequest = async (role: CreateRoleTypes) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/role/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(role),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: addRole, isLoading, isError, isSuccess, error } = useMutation(RoleRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        addRole,
        isLoading,
        isError,
        isSuccess
    }
};
