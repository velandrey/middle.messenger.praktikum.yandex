import Block, {TypeProps} from '@/utils/block';
import {Button, FormField, Input} from "@/components";
import {getFieldParams} from "@/utils/data";
import {InputParams, State} from "@/utils/types";
import {FormValidator} from "@/utils/validator";
import {hoc} from "@/utils/hoc";
import userApi from "@/api/user-api";


export class ProfileEdit extends Block {
    constructor({...props}: object) {
        const fieldsLColum: string[] = [
            'first_name',
            'second_name',
            'nic_name',
        ];
        const fieldsRColum: string[] = [
            'login',
            'email',
            'phone',
        ];
        const inputsLeft: Input[] = getFieldParams(fieldsLColum).map((item: InputParams) => new FormField({...item}));
        const inputsRight: Input[] = getFieldParams(fieldsRColum).map((item: InputParams) => new FormField({...item}));
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
        });
    }

    submitCallback(e: Event) {
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
                userApi.changeProfile({
                    first_name: arResult.first_name,
                    second_name: arResult.second_name,
                    display_name: arResult.display_name,
                    login: arResult.login,
                    email: arResult.email,
                    phone: arResult.phone
                });
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
    }


    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        console.log(oldProps, newProps);


        // if(newProps.user && typeof newProps.user === 'object') {
        //     newProps.UserName = getFullName(newProps.user as UserInfo);
        //     if('avatar' in newProps.user && newProps.user.avatar){
        //         newProps.Avatar = newProps.user.avatar;
        //     } else {
        //         newProps.Avatar = defaultAvatarLink;
        //     }
        // }

        return super.componentDidUpdate(oldProps, newProps);
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

export const profileEdit = hoc(
    state =>
        ({
            user: state.user,
        }) as State
)(ProfileEdit);
