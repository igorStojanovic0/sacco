export type Response = {
    _id: string;
    loanId: string;
    nameOfTeacher: string;
    phone: string;
    email: string;
    loanStatus: "Pending" | "Update required" | "Approved" | "Rejected";
    message: string;
    response: string;
    status: "Resolved" | "Denied" | "In progress";

};

export const listOfResponses: Response[] = [
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        loanId: "asdfa43j0sa8dfj0j304j32323d43fdsaf",
        nameOfTeacher: "Jane Doe",
        phone: "0712345678",
        email: "john.doe@example.com",
        loanStatus: "Pending",
        message: "Can you provide us with a lisible work contract. The one you provided was not clear",
        response: "",
        status: "In progress",
    },
    {
        _id: "asdfa43j0sa8dfj0j304j34rasefr",
        loanId: "asdfa43j0sa8dfj0j304j32323d43fdsaf",
        nameOfTeacher: "Jane Doe",
        phone: "0712345678",
        email: "john.doe@example.com",
        loanStatus: "Pending",
        message: "The bank account you provided is not valid",
        response: "Thank you for updating me, I have updated my application with a new bank account.",
        status: "Resolved",
    },
];