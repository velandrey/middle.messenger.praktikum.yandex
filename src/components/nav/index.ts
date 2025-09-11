import './style.pcss';
import Block from '@/utils/block'
import {PageLinkProps} from "@/utils/types";

export class Nav extends Block {
    constructor({ ...props }:object) {
        super({...props})
    }

    render() {
        let html = '';
        if(this.lists.pages){
            html = '<nav class="nav"><ul class="nav_list">';
            this.lists.pages.forEach((page: PageLinkProps) => {
                html += `
                    <li class="nav_list_item">
                        <a href="#" class="nav_list_item_link ${page.class}" data-link="${page.link}">${page.title}</a>
                    </li>
                `;
            });
            html += '</nav></ul>';

        }
        return html;
    }
}
