export type Page = {
    title: string,
    link: string,
    class?: string;
}
export type Context = {
    title: string,
    pages: Page[],
    full_name?: string,
    image?: string,
}