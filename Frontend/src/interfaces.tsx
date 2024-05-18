export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

export interface IMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface IRoom {
    _id: string;
    people: string[];
    messages: string[];
    createdAt: string;
    updatedAt: string[];
}

export interface IMessageProps {
    sender: IUser;
    receiver: IUser;
    message: IMessage;
}

export interface UserSidebarInfo {
    room: IUser;
    lastIndex: boolean;
    updateRoomData(roomId: string, changedStatus: string): void;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface SendMessageProps {
    message: string;
}

export interface ISignup {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}
