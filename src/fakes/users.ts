export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    verified: boolean;
    role: "Teacher" | "Manager" | "Admin";
};

export const listOfManager: User[] = [
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "323masodifj904joisdjafoasdjfjoi",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "40jd0ajsdf0-9ajsdfjasodfjasodfja",
        firstName: "Eric",
        lastName: "Owen",
        email: "eric.owen@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
];


export const listOfTeachers: User[] = [
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "323masodifj904joisdjafoasdjfjoi",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
    {
        _id: "40jd0ajsdf0-9ajsdfjasodfjasodfja",
        firstName: "Eric",
        lastName: "Owen",
        email: "eric.owen@example.com",
        phone: "0712345678",
        role: "Manager",
        verified: true,
    },
];