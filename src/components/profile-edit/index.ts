import Block from '@/utils/block'
import {Button, Input} from "@/components";
import {getFieldParams} from "@/utils/data";
import {InputParams} from "@/utils/types";

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
        const inputsLeft: Input[] = getFieldParams(fieldsLColum).map((item: InputParams) => new Input(item));
        const inputsRight: Input[] = getFieldParams(fieldsRColum).map((item: InputParams) => new Input(item));
        super({
            ...props,
            InputsLeft: inputsLeft,
            InputsRight: inputsRight,
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_save_profile',
                label: 'Сохранить',
            }),
        })
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
