import { createContext, useState } from "react";

type Props = {
    children: React.ReactNode;
}

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: string;
}

type Application = {
    firstName: string;
};

type ContextData = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    applications: Application[];
    setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

export const Store = createContext({});

const StoreContext = ({ children }: Props) => {
    const [user, setUser] = useState<User>({
        _id: "",
        name: "",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        role: "",
    });

    const [applications, setApplications] = useState<Application[]>([])

    const contextData: ContextData = {
        user,
        setUser,
        applications,
        setApplications
    }

    return (
        <Store.Provider value={contextData}>
            {children}
        </Store.Provider>
    )
}

export default StoreContext;