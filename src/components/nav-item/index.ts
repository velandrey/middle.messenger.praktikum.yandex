import Block from '@/utils/block'

export class NavItem extends Block {
    constructor({...props}: object) {
        super({...props})
    }

    render() {
        return `
            <li class="nav_list_item">
                <a href="#" class="nav_list_item_link {{class}}" data-link="{{link}}">{{title}}</a>
            </li>
        `;
    }
}
