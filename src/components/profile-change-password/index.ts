import Block from '@/utils/block';
import {Button, FormField, Input} from "@/components";
import {FormValidator} from "@/utils/validator";
import {getFieldParams} from "@/utils/data";
import {InputParams} from "@/utils/types";
import userController from "@/controllers/user-controller";

export class ProfileChangePassword extends Block {
    constructor({...props}: object) {
        const fieldsColum: string[] = [
            'oldPassword',
            'newPassword',
        ];
        const formField: Input[] = getFieldParams(fieldsColum).map((item: InputParams) => new FormField(item));
        super({
            ...props,
            FormField: formField,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_save_password',
                label: 'Изменить пароль',
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
                const result = await userController.changePassword({
                    oldPassword: arResult.oldPassword,
                    newPassword: arResult.newPassword,
                });
                const modal = document.getElementById('modal_change_password');
                if (result && modal) {
                    modal.classList.remove('active');
                }
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
    }

    render() {
        return `
            <form action="/" method="post">
                {{{FormField}}}
                {{{ButtonSubmit}}}
            </form>
        `;
    }
}
