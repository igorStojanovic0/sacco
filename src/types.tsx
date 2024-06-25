export type User = {
    _id: string;
    title?: string;
    surName: string;
    givenName: string;
    otherNames?: string;
    photograph?: File | null; // assuming it's a file upload
    gender?: string;
    tribe?: string;
    religion?: string;
    placeOfBirth?: string;
    currentParish?: string;
    birthday: string;
    nationalIDNumber: string;
    nationalIDPhoto?: File | null; // assuming it's a file upload
    phone: string;
    email: string;
    homeAddress?: string;
    homeLocation?: string;
    districtOfBirth?: string;
    birthParish?: string;
    birthVillage?: string;
    birthHome?: string;
    maritalStatus?: string;
    profession?: string;
    jobTitle?: string;
    nextOfKin?: {
        nationalID?: string;
        contactName?: string;
        contactPhone?: string;
        contactEmail?: string;
    };
    monthlyIncome?: string;
    bankName?: string;
    accountNumber?: string;
    registeredMobileAccount?: string;
    registeredEmailWithBank?: string;
    highestEducation?: string;
    employmentStatus?: string;
    placeOfWorkAddress?: string;
    employerDetails?: {
        name?: string;
        salary?: string;
        sideHustleIncome?: string;
    };
    groupMembership?: {
        joiningDate?: string;
        recommender?: {
            fullName?: string;
            nationalID?: string;
            email?: string;
            phone?: string;
        };
    };
    userID?: string;
    notificationPreferences?: string;
    twoFactorAuth?: boolean;
    securityQuestions?: {
        question1?: string;
        answer1?: string;
        question2?: string;
        answer2?: string;
    };
    consentAgreements?: boolean;
    customFields?: any; // assuming it can be any type
    createdAt: Date;
};


export type CreateRoleTypes = {
    role_name: string;
    description: string;
};

export type CreateUserTypes = {
    email: string;
    surName: string;
    givenName: string;
    phone: string;
    password: string;
    role: string;
}

export type UpdateUserTypes = {
    title?: string;
    surName: string;
    givenName: string;
    otherNames?: string;
    photograph?: File | null; // assuming it's a file upload
    gender?: string;
    tribe?: string;
    religion?: string;
    placeOfBirth?: string;
    currentParish?: string;
    birthday: string;
    nationalIDNumber: string;
    nationalIDPhoto?: File | null; // assuming it's a file upload
    phone: string;
    email: string;
    homeAddress?: string;
    homeLocation?: string;
    districtOfBirth?: string;
    birthParish?: string;
    birthVillage?: string;
    birthHome?: string;
    maritalStatus?: string;
    profession?: string;
    jobTitle?: string;
    nextOfKin?: {
        nationalID?: string;
        contactName?: string;
        contactPhone?: string;
        contactEmail?: string;
    };
    monthlyIncome?: string;
    bankName?: string;
    accountNumber?: string;
    registeredMobileAccount?: string;
    registeredEmailWithBank?: string;
    highestEducation?: string;
    employmentStatus?: string;
    placeOfWorkAddress?: string;
    employerDetails?: {
        name?: string;
        salary?: string;
        sideHustleIncome?: string;
    };
    groupMembership?: {
        joiningDate?: string;
        recommender?: {
            fullName?: string;
            nationalID?: string;
            email?: string;
            phone?: string;
        };
    };
    notificationPreferences?: string;
    twoFactorAuth?: boolean;
    securityQuestions?: {
        question1?: string;
        answer1?: string;
        question2?: string;
        answer2?: string;
    };
    consentAgreements?: boolean;
    customFields?: any; // assuming it can be any type
}

export type SignInTypes = {
    email: string;
    password: string;
}

export type OPTTypes = {
    otp: string;
}

export type Application = {
    _id: string;
    surName: string;   
    givenName: string;
    nationalId: string;
    email: string;
    userId: string;
    phone: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    numberOfDependencies: number;
    workSchool: string;
    position: string;
    monthlySalary: number;
    amountRequested: number;
    repaymentReriod: number;
    amountToPayPerMonth: number;
    bankAccountNumber: string;
    proofOffEmployment: string;
    copyOfNationalId: string;
    loanStatus: "Pending" | "Update required" | "Approved" | "Rejected";
    createdAt: Date;
};

export type CreateApplicationTypes = {
    surName: string;   
    givenName: string;
    nationalId: string;
    email: string;
    userId: string;
    phone: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    numberOfDependencies: number;
    workSchool: string;
    position: string;
    monthlySalary: number;
    amountRequested: number;
    amountToPayPerMonth: number;
    repaymentReriod: number;
    bankAccountNumber: string;
    proofOffEmployment: string;
    copyOfNationalId: string;
};

export type UpdateApplicationTypes = {
    _id: string;
    surName: string;   
    givenName: string;
    nationalId: string;
    email: string;
    userId: string;
    phone: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    numberOfDependencies: number;
    workSchool: string;
    position: string;
    monthlySalary: number;
    amountRequested: number;
    repaymentReriod: number;
    amountToPayPerMonth: number;
    bankAccountNumber: string;
    proofOfEmployment: string;
    copyOfNationalId: string;
    loanStatus: "Pending" | "Update required" | "Approved" | "Rejected";
    createdAt: Date;
};

export type Response = {
    _id: string;
    loanId: string;
    loanStatus: "Pending" | "Update required" | "Approved" | "Rejected";
    message: string;
    response: string;
    status: "Resolved" | "Denied" | "In progress";

};