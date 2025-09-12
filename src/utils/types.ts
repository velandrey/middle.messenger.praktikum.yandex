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
