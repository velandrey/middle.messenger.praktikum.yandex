import Block from '@/utils/block'
import {Button, FormField} from "@/components";
import {getFieldParams} from "@/utils/data";

export class FormRegistration extends Block {
    constructor(props: object) {
        const fields = [
            'email',
            'login',
            'first_name',
            'second_name',
            'phone',
            'password',
            'password2',
        ]
        const formFields = getFieldParams(fields).map((item)=>{
            if(item){
                return new FormField(item)
            }
            return {}
        });
        super({
            ...props,
            FormFields: formFields,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_registration',
                label: 'Зарегистрироваться',
            }),
            events: {
                submit: (e) => {
                    e.preventDefault()
                    console.log('Случился submit', e.target)
                },
            }
        })
    }

    render() {
        return `
            <form class="form_box" action="/" method="post">
                {{{FormFields}}}
                {{{ButtonSubmit}}}
            </form>
        `;
    }
}
