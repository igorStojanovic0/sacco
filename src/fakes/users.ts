export type User = {
    _id: string;
    surName: string;
    givenName: string;
    email: string;
    phone: string;
    verified: boolean;
    role: "User" | "Manager" | "Admin";
};

export const listOfManager: User[] = [
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        surName: "John",
        givenName: "Doe",
        email: "john.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "323masodifj904joisdjafoasdjfjoi",
        surName: "Jane",
        givenName: "Doe",
        email: "jane.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "40jd0ajsdf0-9ajsdfjasodfjasodfja",
        surName: "Eric",
        givenName: "Owen",
        email: "eric.owen@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
];


export const listOfUsers: User[] = [
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        surName: "John",
        givenName: "Doe",
        email: "john.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "323masodifj904joisdjafoasdjfjoi",
        surName: "Jane",
        givenName: "Doe",
        email: "jane.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "40jd0ajsdf0-9ajsdfjasodfjasodfja",
        surName: "Eric",
        givenName: "Owen",
        email: "eric.owen@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
];