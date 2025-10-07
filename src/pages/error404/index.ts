import Block from '@/utils/block';
import {Error} from "@/components/error";

export class Error404 extends Block {
    constructor({...props}) {
        super({
            ...props,
            Error: new Error({
                title: 'Ошибка 404',
                description: 'Такой страницы не существует.'
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
