import './style.pcss';
import {Page} from "../../../types";

type props = {
    pages:Page[]
}
export function Nav({pages}:props):string {
    let html = '<nav class="nav"><ul class="nav_list">';
    pages.forEach((page:Page)=>{
        html += `<li class="nav_list_item"><a href="#" class="nav_list_item_link ${page.class}" data-link="${page.link}">${page.title}</a></li>`;
    });
    html += '</nav></ul>';
    return html;
}
