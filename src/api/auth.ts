import { CreateUserTypes, OPTTypes, SignInTypes, UpdateUserTypes, User } from "@/types";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const environment = process.env. VITE_ENVIRONMENT;

export const useSignUp = () => {
    const accessToken = Cookies.get("reset-token");

    const SignUpRequest = async (user: CreateUserTypes) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: signUp, isLoading, isError, isSuccess, error } = useMutation(SignUpRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        signUp,
        isLoading,
        isError,
        isSuccess
    }
};

export const useSignIn = () => {
    const SignInRequest = async (user: SignInTypes) => {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);

        }
        Cookies.set('access-token', responseData.token, {
            secure: environment === "production" ? true : false,
            expires: 1/24
        });
        
    };

    const { mutateAsync: signIn, isLoading, isError, isSuccess, error } = useMutation(SignInRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        signIn,
        isLoading,
        isError,
        isSuccess
    }
};

export const useForgotPassword = () => {
    const ForgotPasswordRequest = async (user: { email: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: forgotPassword, isLoading, isError, isSuccess, error } = useMutation(ForgotPasswordRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        forgotPassword,
        isLoading,
        isError,
        isSuccess
    }
};

export const useResetPassword = () => {
    const accessToken = Cookies.get("reset-token");

    const ResetPasswordRequest = async (user: { password: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: resetPassword, isLoading, isError, isSuccess, error } = useMutation(ResetPasswordRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        resetPassword,
        isLoading,
        isError,
        isSuccess
    }
};

export const useValidateOTP = () => {
    const SignInRequest = async (data: OPTTypes) => {
        console.log("opt", data)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: validateOTP, isLoading, isError, isSuccess, error } = useMutation(SignInRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        validateOTP,
        isLoading,
        isError,
        isSuccess
    }
};

export const useRegenerateOTP = () => {
    const SignInRequest = async (data: { id: string }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/regenerateOtp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();


        
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    };

    const { mutateAsync: validateOTP, isLoading, isError, isSuccess, error } = useMutation(SignInRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        validateOTP,
        isLoading,
        isError,
        isSuccess
    }
};

export const useGetProfileData = () => {
    const accessToken = Cookies.get('access-token');
    const getUserProfileRequest = async (): Promise<User> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/user`, {
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

    const { data: currentUser, isLoading } = useQuery("userInfo", () => getUserProfileRequest());

    
    useEffect(() => {
        if (typeof window !== 'undefined' && currentUser?._id) {
            window.localStorage.setItem('user', currentUser?._id as string)
        }
    }, [currentUser])

    return { currentUser, isLoading }
};

export const useUpdateUserAccount = () => {
    const updateUserAccountRequest = async (user: UpdateUserTypes) => {
        console.log("total profile", user);
        
        const accessToken = Cookies.get('access-token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }
    }

    const { mutateAsync: updateAccount, isLoading, isSuccess, error, reset } = useMutation(updateUserAccountRequest);

    if (isSuccess) {
        toast.success("User profile updated!");
        window.location.reload();
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        updateAccount,
        isLoading
    }
};

export const useGetAllUsers = () => {
    const accessToken = Cookies.get('access-token');
    const getAllUsersRequest = async (): Promise<User[]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/allUser`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const responseData = await response.json();
        
        const { allUsers } = responseData
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return allUsers;
    };

    const { data: allUsers, isLoading } = useQuery("allUsers", () => getAllUsersRequest());

    return { allUsers, isLoading }
};



export const useGetGroupUserList = (groupId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getGroupUserList = async (groupId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/findByGroupId?groupId=${groupId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { groupUserList} = responseData

        return groupUserList;
    };

    const { data: groupUserList, isLoading } = useQuery("groupUserList", () => getGroupUserList(groupId));

    return { groupUserList, isLoading }
};

export const useGetGroupChannelUserList = (channelId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getGroupChannelUserList = async (channelId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/findByChannelId?channelId=${channelId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { groupChannelUserList} = responseData

        return groupChannelUserList;
    };

    const { data: groupChannelUserList, isLoading } = useQuery("groupChannelUserList", () => getGroupChannelUserList(channelId));

    return { groupChannelUserList, isLoading }
};

export const useGetGroupFriendList = (groupId: string) => {
    const accessToken = Cookies.get('access-token');
    
    const getGroupFriendList = async (groupId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groupUserFriend/findByGroupIdUserId?groupId=${groupId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message);
        }

        const { groupFriendList} = responseData

        return groupFriendList;
    };

    const { data: groupFriendList, isLoading } = useQuery("groupFriendList", () => getGroupFriendList(groupId));

    return { groupFriendList, isLoading }
};