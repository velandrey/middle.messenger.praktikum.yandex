import './style.pcss';
import Block from '@/utils/block';
import {NavItem} from "@/components/nav-item";
import {PageLinkProps} from "@/utils/types";

export class Nav extends Block {
    constructor({...props}: object) {
        let navItems: NavItem[] = [];
        if ('pages' in props) {
            const {pages} = props;
            if (Array.isArray(pages)) {
                navItems = pages.map((page: PageLinkProps) => {
                    return new NavItem(page);
                });
            }
        }
        super({
            ...props,
            NavItemsBlock: navItems,
        });
    }

    render() {
        return `
            <nav class="nav">
                <ul class="nav_list">
                    {{{NavItemsBlock}}}
                </ul>
            </nav>
        `;
    }
}
