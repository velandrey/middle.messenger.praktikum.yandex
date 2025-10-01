export type PageLinkProps = {
    title: string,
    link: string,
    class?: string;
}
export type PageContext = {
    title: string,
    pages: PageLinkProps[],
}
export type Message = {
    direction: 'to' | 'from',
    type: 'text' | 'image',
    time: string,
    status?: 'read' | 'unread',
    content: string,
}
export type Discussant = {
    id: number,
    name: string,
    date: string,
    count: number,
    text: string,
    image: string,
    active?: 'active' | '',
    messages: Message[],
}
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
    second_name: string,
}

export type State = {
    loading: boolean;
    user: UserInfo | null;
};

export type PlainObject<T = unknown> = {
    [k in string]: T;
}
