import { CreateRoleTypes } from "@/types";
import Cookies from "js-cookie";
import { useMutation } from 'react-query';
import { toast } from 'sonner';
// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const environment = process.env. VITE_ENVIRONMENT;

type UpdateUserRoleTypes = {
    is_active: boolean;
    userId: string
}

export const useAddRole = () => {
    const RoleRequest = async (role: CreateRoleTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/role/add`, {
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

export const useUpdateUserRole = () => {
    const updateUserRoleRequest = async (data: UpdateUserRoleTypes) => {
        
        const accessToken = Cookies.get('access-token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/role/updateUserRole`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    }

    const { mutateAsync: updateUserRole, isLoading, isSuccess, error, reset } = useMutation(updateUserRoleRequest);

    if (isSuccess) {
        toast.success("Successfully updated!");
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        updateUserRole,
        isLoading
    }
};
