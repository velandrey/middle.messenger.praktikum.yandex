import Block from '@/utils/block';
import {Button, FormField} from "@/components";
import {getFieldParams} from "@/utils/data";
import {FormValidator} from "@/utils/validator";
import {InputParams, LoginData} from "@/utils/types";
import authController from "@/controllers/auth-controller";

export class FormAuth extends Block {
    constructor(props: object) {
        const fields:string[] = [
            'login',
            'password',
        ];
        const formFields:FormField[] = getFieldParams(fields).map((item:InputParams) => {

            //TODO удали value
            const value = (item.name === 'login') ? 'trolollelo@trala.la' : '!QAZ2wsx';
            //TODO удали выше value

            return new FormField({
                value:value,
                ...item
            });
        });
        super({
            ...props,
            FormFields: formFields,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_registration',
                label: 'Войти',
            }),
            events: {
                submit: (e: Event) => this.submitCallback(e)
            }
        });
    }

    submitCallback(e: Event) {
        e.preventDefault();
        if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const authData: LoginData = {
                login: '',
                password: ''
            };
            formData.forEach((value: FormDataEntryValue, nameField: string) => {
                authData[nameField as keyof LoginData] = value.toString();
            });
            const validator = new FormValidator();
            const validationResult = validator.validateForm(authData);
            if (validationResult.isValid) {
                authController.login(authData);
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
