import {PageLinkProps} from "@/utils/data";

export type Context = {
    title: string,
    pages: PageLinkProps[],
    full_name?: string,
    image?: string,
}
