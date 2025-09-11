import Block from '@/utils/block'
import {Button, Input} from "@/components";
import {fieldsParams} from "@/utils/data";

export class ProfileEdit extends Block {
    constructor({ ...props }:object) {
        const fieldsL = [
            'first_name',
            'second_name',
            'nic_name',
            'login',
        ]
        const inputsLeftParams = fieldsL.map(fieldName=>{
            const field = fieldsParams.find(fieldRow=> fieldRow.name === fieldName)
            return (field) ? field : false
        });

        const fieldsR = [
            'email',
            'phone',
            'avatar',
        ]
        const inputsRightParams = fieldsR.map(fieldName=>{
            const field = fieldsParams.find(fieldRow=> fieldRow.name === fieldName)
            return (field) ? field : false
        });
        const inputsLeft = inputsLeftParams.map(item=>new Input(item));
        const inputsRight = inputsRightParams.map(item=>new Input(item));
        super({
            ...props,
            InputsLeft:inputsLeft,
            InputsRight:inputsRight,
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
