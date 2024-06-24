export type Application = {
    _id: string;
    firstName: string;   
    lastName: string;
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

function getRandomDateWithinLast30Days() {
    const today = new Date();
    const pastDate = new Date();
    
    // Set pastDate to 30 days before today
    pastDate.setDate(today.getDate() - 30);
    
    // Get the time range between pastDate and today in milliseconds
    const timeRange = today.getTime() - pastDate.getTime();
    
    // Generate a random time within this range
    const randomTime = pastDate.getTime() + Math.random() * timeRange;
    
    // Create a new Date object with the random time
    const randomDate = new Date(randomTime);
    
    return randomDate;
  }
  
  function getRandomItem(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  function getRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function getRandomEmail() {
    const domains = ['example.com', 'sample.com', 'test.com'];
    return `${getRandomString(5)}@${getRandomItem(domains)}`;
  }
  
  function getRandomPhoneNumber() {
    return '07' + Math.floor(Math.random() * 90000000 + 10000000).toString();
  }
  
  function getRandomNationalId() {
    return Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString();
  }
  
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const genders = ["Male", "Female", "Other"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const loanStatuses = ["Pending", "Update required", "Approved", "Rejected"];
  
  export const applications = Array.from({ length: 13 }, (_, index) => ({
    _id: (index + 1).toString(),
    firstName: getRandomItem(['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Pat']),
    lastName: getRandomItem(['Doe', 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones']),
    nationalId: getRandomNationalId(),
    email: getRandomEmail(),
    userId: `T${getRandomNumber(1000, 9999)}`,
    phone: getRandomPhoneNumber(),
    dateOfBirth: new Date(getRandomNumber(1970, 2000), getRandomNumber(0, 11), getRandomNumber(1, 28)),
    gender: getRandomItem(genders),
    maritalStatus: getRandomItem(maritalStatuses),
    numberOfDependencies: getRandomNumber(0, 5),
    workSchool: getRandomItem(['Greenwood High', 'Lakeside Academy', 'Riverside School', 'Sunnyvale Institute']),
    position: getRandomItem(['Math User', 'Science User', 'English User', 'History User']),
    monthlySalary: getRandomNumber(300000, 600000),
    amountRequested: getRandomNumber(5000000, 20000000),
    amountToPayPerMonth: getRandomNumber(100000, 500000),
    repaymentReriod: getRandomNumber(12, 84),
    bankAccountNumber: getRandomString(10),
    proofOffEmployment: `https://www.canva.com/p/templates/${getRandomString(20)}`,
    copyOfNationalId: `https://www.canva.com/p/templates/${getRandomString(20)}`,
    loanStatus: getRandomItem(loanStatuses),
    createdAt: getRandomDateWithinLast30Days()
  }));
  