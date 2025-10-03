import Block, {TypeProps} from '@/utils/block';
import {Button, FormField} from "@/components";
import {getFieldParams} from "@/utils/data";
import {InputParams, State, UserInfo} from "@/utils/types";
import {FormValidator} from "@/utils/validator";
import {hoc} from "@/utils/hoc";
import userController from "@/controllers/user-controller";
import store from "@/utils/store";

function constructInputs(){
    const fieldsColum: string[] = [
        'first_name',
        'second_name',
        'display_name',
        'login',
        'email',
        'phone',
    ];
    const user = store.getState().user;
    return getFieldParams(fieldsColum).map((item: InputParams) => {
        let value = '';
        const key:string = item.name;
        if(user && key in user){
            value = user[key as keyof UserInfo] as string;
        }
        return new FormField({
            ...item,
            value: value,
        });
    });
}

export class ProfileEdit extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            Inputs: constructInputs(),
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
                const result = await userController.changeProfile({
                    first_name: arResult.first_name,
                    second_name: arResult.second_name,
                    display_name: arResult.display_name,
                    login: arResult.login,
                    email: arResult.email,
                    phone: arResult.phone
                });
                const modal = document.getElementById('modal_change_profile');
                if(result && modal){
                    modal.classList.remove('active');
                }
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
    }


    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        if(newProps.user){
            this.setProps({Inputs: constructInputs()});
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <form action="/" method="post">
                <div class="profile_edit_row">
                    {{{Inputs}}}
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
