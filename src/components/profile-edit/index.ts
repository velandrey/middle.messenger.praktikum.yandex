import Block from '@/utils/block'
import {Button, FormField, Input} from "@/components";
import {getFieldParams} from "@/utils/data";
import {InputParams} from "@/utils/types";
import {FormValidator} from "@/utils/validator";

/**
 * Получить параметры для полей ввода.
 * @param arrFieldName
 */


export class ProfileEdit extends Block {
    constructor({...props}: object) {
        const fieldsLColum: string[] = [
            'first_name',
            'second_name',
            'nic_name',
            'login',
        ]
        const fieldsRColum: string[] = [
            'email',
            'phone',
            'avatar',
        ]
        const inputsLeft: Input[] = getFieldParams(fieldsLColum).map((item: InputParams) => new FormField(item));
        const inputsRight: Input[] = getFieldParams(fieldsRColum).map((item: InputParams) => new FormField(item));
        super({
            ...props,
            InputsLeft: inputsLeft,
            InputsRight: inputsRight,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_save_profile',
                label: 'Сохранить',
            }),
            events: {
                submit: (e: Event) => this.submitCallback(e)
            }
        })
    }

    submitCallback(e: Event) {
        e.preventDefault()
        console.log(e)
        if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const arResult: Record<string, string> = {};
            formData.forEach((value: FormDataEntryValue, nameField: string) => {
                arResult[nameField] = value.toString();
            });
            const validator = new FormValidator();
            const validationResult = validator.validateForm(arResult);
            if (validationResult.isValid) {
                console.log('Корректные данные для изменения профиля: ', arResult)
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
    }

    render() {
        return `
            <form action="/" method="post">
                <div class="profile_edit_row">
                    <div class="profile_edit_colum">
                        {{{InputsLeft}}}
                    </div>
                    <div class="profile_edit_colum">
                        {{{InputsRight}}}
                    </div>
                </div>
                <div class="profile_edit_save">
                    {{{ButtonSubmit}}}
                </div>
            </form>
        `;
    }
}
