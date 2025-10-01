import Block from '@/utils/block';
import {Button, FormField} from "@/components";
import {getFieldParams} from "@/utils/data";
import {FormValidator} from "@/utils/validator";
import authController from "@/controllers/auth-controller";

export class FormRegistration extends Block {
    constructor(props: object) {
        const fields = [
            'email',
            'login',
            'first_name',
            'second_name',
            'phone',
            'password',
        ];
        const formFields = getFieldParams(fields).map((item)=>{
            if(item){
                //TODO удали value
                let value = '';
                switch (item.name) {
                case 'first_name': 
                    value = 'Kroko';
                    break;
                case 'second_name':
                    value = 'DilDil';
                    break;
                case 'login':
                    value = 'kroko@dil.dil';
                    break;
                case 'email':
                    value = 'kroko@dil.dil';
                    break;
                case 'password':
                    value = '!QAZ2wsx';
                    break;
                case 'phone':
                    value = '+79846543210';
                    break;
                }
                item = {
                    value: value,
                    ...item
                };
                //TODO удали всё выше


                return new FormField(item);
            }
            return {};
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
                submit: (e: Event) => this.submitCallback(e)
            }
        });
    }

    async submitCallback(e: Event) {
        e.preventDefault();
        if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const arResult: Record<string, string> = {};
            formData.forEach((value: FormDataEntryValue, nameField: string) => {
                arResult[nameField] = value.toString();
            });
            const validator = new FormValidator();
            const validationResult = validator.validateForm(arResult);
            if (validationResult.isValid) {
                await authController.registration({
                    first_name: arResult.first_name,
                    second_name: arResult.second_name,
                    login: arResult.login,
                    email: arResult.email,
                    password: arResult.password,
                    phone: arResult.phone,
                });
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
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
