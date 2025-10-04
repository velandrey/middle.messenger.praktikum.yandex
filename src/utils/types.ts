import MessageController from "@/controllers/message-controller";

export type InputParams = {
    name: string,
    type: 'text' | 'password' | 'email' | 'file',
    label: string,
    error: string,
    required?: 'required',
    value?: string,
}
export type LoginData = {
    login: string;
    password: string;
}
export type RegistrationData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}
export type UserInfo = {
    id: number | null;
    avatar: string | null;
    display_name: string | null;
    email: string | null;
    first_name: string | null;
    second_name: string | null;
    login: string | null;
    phone: string | null;
};

export type ProfileData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}
export type PasswordData = {
    oldPassword: string,
    newPassword: string,
}
export type Chat = {
    id: number,
    title: string,
    avatar?: string,
    unread_count: number,
    created_by?: number,
    last_message: {
        user?: UserInfo,
        time?: string,
        content?: string
    }
};

export type Message = {
    id: number
    user_id: number
    chat_id: number
    content: string
    file: unknown
    is_read: boolean
    type: 'message' | string
    time: string
}

export type State = {
    loading: boolean;
    user: UserInfo | null;
    msgSocket: MessageController | null;
    chatList: Chat[];
    search: string;
    chatUsers: UserInfo[];
    searchUsers: UserInfo[];
    chatPartnerUserId: number | null;
    chatIdActive: number | null;
    messages: Message[];
};

export type PlainObject<T = unknown> = {
    [k in string]: T;
}
