export function generateRandomPassword(): string {
    const length = 12; // Minimum length to ensure higher uniqueness
    const digits = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    // Ensuring the inclusion of at least one character of each type
    const allChars = digits + lowercase + uppercase + symbols;
    
    function getRandomChar(str: string) {
      return str[Math.floor(Math.random() * str.length)];
    }
  
    let password = [
      getRandomChar(digits),
      getRandomChar(lowercase),
      getRandomChar(uppercase),
      getRandomChar(symbols)
    ];
    
    // Fill the remaining length with random characters from all possible characters
    for (let i = password.length; i < length; i++) {
      password.push(getRandomChar(allChars));
    }
    
    // Shuffle the array to avoid predictable sequences
    password = password.sort(() => Math.random() - 0.5);
    
    // Convert the array to a string
    return password.join('');
  }
  