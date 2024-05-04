export const emailValidationHandler = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const format = (value: number): string => {
    if (value < 10) return "0" + value.toString();
    else {
        return value.toString();
    }
};

const convertHours = (hours: number) => {
    if (hours > 12) {
        return hours - 12;
    } else {
        return hours;
    }
};

const getHourPeriod = (hours: number) => {
    if (hours > 12) {
        return "PM";
    } else {
        return "AM";
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
        convertHours(dateTime.getHours()) +
        ":" +
        format(dateTime.getMinutes()) +
        " " +
        getHourPeriod(dateTime.getHours())
    );
};
