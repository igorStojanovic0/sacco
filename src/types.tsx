export type User = {
    _id: string;
    title?: string;
    surName: string;
    givenName: string;
    otherNames?: string;
    photograph?: string; // assuming it's a file upload
    gender: "Male" | "Female" | "Other";
    tribe: string;
    religion: string;
    placeOfBirth: string;
    currentParish: string;
    birthday: Date;
    nationalIDNumber: string;
    nationalIDPhoto?: string; // assuming it's a file upload
    phone: string;
    email: string;
    homeAddress: string;
    homeLocation: string;
    districtOfBirth: string;
    birthParish: string;
    birthVillage: string;
    birthHome: string;
    maritalStatus?: string;
    profession: string;
    jobTitle: string;
    nextOfKin: {
        nationalID: string;
        contactName: string;
        contactPhone: string;
        contactEmail: string;
    };
    monthlyIncome?: string;
    bankName?: string;
    accountNumber?: string;
    registeredMobileAccount?: string;
    registeredEmailWithBank?: string;
    highestEducation?: string;
    otherEducation?: string;
    employmentStatus?: string;
    placeOfWorkAddress?: string;
    employerDetails?: {
        name?: string;
        salary?: string;
        sideHustleIncome?: string;
    };
    groupMembership?: {
        joiningDate: Date;
        recommender?: {
            fullName?: string;
            nationalID?: string;
            email?: string;
            phone?: string;
        };
    };
    userID?: string;
    notificationPreferences?: string;
    twoFactorAuth: "Enabled" | "Disabled";
    securityQuestions?: {
        question?: string;
        answer?: string;
    };
    consentAgreements?: boolean;
    customFields?: any;
    is_profileCompleted: boolean;
    is_active: boolean;
    createdAt: Date;
};

export type CreateUserTypes = {
    email: string;
    surName: string;
    givenName: string;
    phone?: string;
    password: string;
    role: string;
}

export type UpdateUserTypes = {
    title?: string;
    surName: string;
    givenName: string;
    otherNames?: string;
    photograph?: string; // assuming it's a file upload
    gender: "Male" | "Female" | "Other";
    tribe?: string;
    religion?: string;
    placeOfBirth?: string;
    currentParish?: string;
    birthday?: Date;
    nationalIDNumber: string;
    nationalIDPhoto?: string; // assuming it's a file upload
    phone?: string;
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
    otherEducation?: string;
    employmentStatus?: string;
    placeOfWorkAddress?: string;
    employerDetails?: {
        name?: string;
        salary?: string;
        sideHustleIncome?: string;
    };
    groupMembership?: {
        joiningDate?: Date;
        recommender?: {
            fullName?: string;
            nationalID?: string;
            email?: string;
            phone?: string;
        };
    };
    notificationPreferences?: string;
    twoFactorAuth: "Enabled" | "Disabled";
    securityQuestions?: {
        question?: string;
        answer?: string;
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


export type CreateRoleTypes = {
    role_name: string;
    description: string;
};

export type GroupTypes = {
    _id: string
    name: string;
    group_type: string;
    group_avatar:string;
    tags: string;
    description: string;
    created_by: string;
    del_flag: number;
    createdAt: Date;
    
};

export type CreateGroupTypes = {
    name: string;
    group_type?: string;
    group_state?: string;
    selectedUsers_Id?: string[];
    group_avatar?:string;
    tags?: string;
    description?: string;
    created_by?: string;
};

export type UpdateGroupTypes = {
    name: string;
    group_type?: string;
    description?: string;
    created_by?: string;
};

export type JoinedGroupTypes = {
    group_id: string;
    role_name: string;
    group_name: string;
    group_type: string;
    group_state: string;
    group_avatar: string;
    description: string;
    tags: string;
    created_by: string;
    del_flag: number;
    createdAt: Date;
    updatedAt: Date;
};

export type JoinGroupTypes = {
    user_id?: string;
    groud_id?: string;
};


export type CourseProgressTypes = {
    currentStep: number;
    completed: number;
};

export type CourseTypes = {
        id: string;
        title: string;
        slug: string;
        description: string;
        category: string;
        duration: number;
        totalSteps: number;
        updatedAt: string;
        featured: boolean;
        progress: CourseProgressTypes
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