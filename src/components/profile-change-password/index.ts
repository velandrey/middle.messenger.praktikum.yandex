import Block from '@/utils/block'
import {Button, FormField} from "@/components";

export class ProfileChangePassword extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            InputPass: new FormField({
                type: 'password',
                name: 'oldPassword',
                label: 'Старый пароль',
                required: 'required',
            }),
            InputPass2: new FormField({
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
            events: {
                submit:(e)=>{
                    e.preventDefault();
                    console.log('Случился submit', e.target)
                },
            }
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
