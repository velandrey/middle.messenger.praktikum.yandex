import './style.pcss';
export function Nav({pages}) {
    let html = '<nav class="nav"><ul class="nav_list">';
    pages.forEach((page)=>{
        html += `<li class="nav_list_item"><a href="#" class="nav_list_item_link ${page.class}" data-link="${page.link}">${page.title}</a></li>`;
    });
    html += '</nav></ul>';
    return html;
}
