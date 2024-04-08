export const emailValidationHandler = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const format = (value: number): string => {
    if (value < 10) return "0" + value.toString();
    else {
        return value.toString();
    }
};

export const convertCreatedAt = (timezone: string) => {
    const dateTime = new Date(timezone);
    return (
        format(dateTime.getDate()) +
        "/" +
        format(dateTime.getMonth() + 1) +
        "/" +
        format(dateTime.getFullYear()) +
        " " +
        format(dateTime.getHours()) +
        ":" +
        format(dateTime.getMinutes())
    );
};
