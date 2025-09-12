import Block from '@/utils/block'
import {Button, FormField} from "@/components";
import {getFieldParams} from "@/utils/data";
import {FormValidator} from "@/utils/validator";
import {InputParams} from "@/utils/types";

export class FormAuth extends Block {
    constructor(props: object) {
        const fields:string[] = [
            'login',
            'password',
        ]
        const formFields:FormField[] = getFieldParams(fields).map((item:InputParams) => {
            return new FormField({
                ...item
            })
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
        })
    }

    submitCallback(e: Event) {
        e.preventDefault()
        if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const arResult: Record<string, string> = {};
            formData.forEach((value: FormDataEntryValue, nameField: string) => {
                arResult[nameField] = value.toString();
            });
            const validator = new FormValidator();
            const validationResult = validator.validateForm(arResult);
            if (validationResult.isValid) {
                console.log('Корректные данные для авторизации: ', arResult)
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
