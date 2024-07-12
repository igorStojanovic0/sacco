import { createContext, useState } from "react";

type Props = {
    children: React.ReactNode;
}

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    surName: string;
    givenName: string;
    role: string;
}

type Application = {
    surName: string;
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
        phone: "123",
        surName: "",
        givenName: "",
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
        <Store.Provider value={{user,setUser}}>
            {children}
        </Store.Provider>
    )
}

export default StoreContext;