import Block from '@/utils/block'
import {Button, Input} from "@/components";

export class ProfileChangePassword extends Block {
    constructor({ ...props }:object) {
        super({
            ...props,
            InputPass:new Input({
                type: 'password',
                name: 'oldPassword',
                label: 'Старый пароль',
                required: 'required',
            }),
            InputPass2:new Input({
                type: 'password',
                name: 'newPassword',
                label: 'Новый пароль',
                required: 'required',
            }),
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_save_password',
                label: 'Изменить пароль',
            }),
        })
    }

    render() {
        return `
            <form action="/" method="post">
                {{{InputPass}}}
                {{{InputPass2}}}
                {{{ButtonSubmit}}}
            </form>
        `;
    }
}
