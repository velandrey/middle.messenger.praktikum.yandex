import Block from '@/utils/block'
import {Button, FormField, Input} from "@/components";
import {getFieldParams, profileData} from "@/utils/data";
import {InputParams} from "@/utils/types";
import {FormValidator} from "@/utils/validator";

function getValue(fieldName:string):string | null {
    const key = Object.keys(profileData).find((key) => {
        return key === fieldName
    })
    if(key){
        return profileData[key];
    }
    return null;
}

function initInput(item:InputParams):FormField {
    const inputParams = {
        ...item
    }
    const value = getValue(inputParams.name);
    if (value) {
        inputParams.value = value;
    }
    return new FormField(inputParams)
}

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
        const inputsLeft: Input[] = getFieldParams(fieldsLColum).map((item: InputParams) => initInput(item));
        const inputsRight: Input[] = getFieldParams(fieldsRColum).map((item: InputParams) => initInput(item));
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
