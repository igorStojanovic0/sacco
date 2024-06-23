import { CreateUserTypes, OPTTypes, SignInTypes, UpdateUserTypes, User } from "@/types";
import Cookies from "js-cookie";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

// const API_BASE_URL = process.env.VITE_API_BASE_URL;
const API_BASE_URL = 'http://localhost:3001';
const environment = process.env. VITE_ENVIRONMENT;

export const useSignUp = () => {
    const SignUpRequest = async (user: CreateUserTypes) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/signin`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgotPassword`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/resetPassword`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/regenerateOtp`, {
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
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/user`, {
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

    return { currentUser, isLoading }
};

export const useUpdateUserAccount = () => {
    const updateUserAccountRequest = async (user: UpdateUserTypes) => {
        const accessToken = Cookies.get('access-token');
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
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