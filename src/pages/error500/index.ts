import Block from '@/utils/block';
import {Nav} from "@/components";
import {Error} from "@/components/error";

export class Error500 extends Block {
    constructor({...props}) {
        super({
            ...props,
            Navigation: new Nav({...props}),
            Error: new Error({
                title: 'Ошибка 500',
                description: 'Мы знаем о возникщей проблеме и уже почти всё починили.'
            })
        });
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    {{{Error}}}
                </main>
            </div>
        `;
    }
}
