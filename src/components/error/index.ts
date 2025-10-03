import './style.pcss';
import Block from '@/utils/block';
import {Routes} from "@/utils/router/routes";

export class Error extends Block {
    constructor({...props}: object) {
        super({...props});
    }

    render() {
        return `
            <div class="error">
                <div class="error_content">
                    <h1 class="main_title error_title">{{title}}</h1>
                    <p class="error_description">{{description}}</p>
                    <p class="error_link"><a href="${Routes.ROOT}" class="nav_list_item">Вернуться</a></p>
                </div>
            </div>
        `;
    }
}
