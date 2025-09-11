import Block from '@/utils/block'
import {Button, Input, Nav} from "@/components";
import {fieldsParams} from "@/utils/data";

export class Registration extends Block {
    constructor({...props}) {
        const fields = [
            'email',
            'login',
            'first_name',
            'second_name',
            'phone',
            'password',
            'password2',
        ]
        const inputsParams = fields.map(fieldName=>{
            const field = fieldsParams.find(fieldRow=> fieldRow.name === fieldName)
            return (field) ? field : false
        });
        const inputs = inputsParams.map((item)=>{
            return new Input(item)
        });
        super({
            ...props,
            Navigation: new Nav({...props}),
            Inputs: inputs,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_registration',
                label: 'Зарегистрироваться',
            }),
        })
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Регистрация</h1>
                        <form class="form_box" action="/" method="post">
                            {{{Inputs}}}
                            {{{ButtonSubmit}}}
                            <div class="form_field_link">
                                <a href="#" class="form_field_link_auth nav_list_item" data-link="Auth">Войти</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        `;
    }
}
