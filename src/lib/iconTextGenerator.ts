export function iconTextGenerator(firstName: string, lastName: string) : string{
    if (!firstName || !lastName) {
        return 'U';
    }
    let iconText = '';
    const firstCaracterForFirstName = firstName.charAt(0).toUpperCase();
    const firstCaracterForLastName = lastName.charAt(0).toUpperCase();
    iconText = firstCaracterForFirstName + firstCaracterForLastName;
    return iconText;
}