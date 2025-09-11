import Block from '@/utils/block'
import {Nav} from "@/components";
import {Error} from "@/components/error";

export class Error404 extends Block {
    constructor({...props}) {
        super({
            ...props,
            Navigation: new Nav({...props}),
            Error: new Error({
                title: 'Ошибка 404',
                description: 'Такой страницы не существует.'
            })
        })
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
