import Block from '@/utils/block'
import {Button, Input, Nav} from "@/components";

export class Auth extends Block {
    constructor({...props}) {
        const inputsParams = [
            {
                type: 'text',
                name: 'login',
                label: 'Логин',
                required: 'required',
            },
            {
                type: 'password',
                name: 'password',
                label: 'Пароль',
                required: 'required',
            }
        ];
        const inputs = inputsParams.map(item=>new Input(item));
        super({
            ...props,
            Navigation: new Nav({...props}),
            Inputs: inputs,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_registration',
                label: 'Войти',
            }),
        })
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Авторизация</h1>
                        <form class="form_box" action="/" method="post">
                            {{{Inputs}}}
                            {{{ButtonSubmit}}}
                            <div class="form_field_link">
                                <a href="#" class="form_field_link_auth nav_list_item" data-link="Registration">Регистрация</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        `;
    }
}
