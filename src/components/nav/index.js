import './style.pcss';
export function Nav({pages}) {
    let html = '';
    pages.forEach((page)=>{
        html += `<a href="#" class="nav__link ${page.class}" data-link="${page.link}">${page.title}</a>`;
    });
    return html;
}
