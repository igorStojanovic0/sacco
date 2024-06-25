export function iconTextGenerator(surName: string, givenName: string) : string{
    if (!surName || !givenName) {
        return 'U';
    }
    let iconText = '';
    const firstCaracterForSurName = surName.charAt(0).toUpperCase();
    const firstCaracterForGivenName = givenName.charAt(0).toUpperCase();
    iconText = firstCaracterForSurName + firstCaracterForGivenName;
    return iconText;
}