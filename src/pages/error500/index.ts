import Block from '@/utils/block';
import {Error} from "@/components/error";

export class Error500 extends Block {
    constructor({...props}) {
        super({
            ...props,
            Error: new Error({
                title: 'Ошибка 500',
                description: 'Мы знаем о возникщей проблеме и уже почти всё починили.'
            })
        });
    }

    render() {
        return `
            <div class="wrapper">
                <main class="app_box">
                    {{{Error}}}
                </main>
            </div>
        `;
    }
}
