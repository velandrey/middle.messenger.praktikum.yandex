import Block from '@/utils/block';
import {Button, FormField, Input} from "@/components";
import {getFieldParams} from "@/utils/data";
import {InputParams} from "@/utils/types";
import userController from "@/controllers/user-controller";

export class ProfileChangeAvatar extends Block {
    constructor({...props}: object) {
        const avatarField: Input[] = getFieldParams(['avatar']).map((item: InputParams) => new FormField(item));
        super({
            ...props,
            FormField: avatarField[0],
            ButtonSubmit: new Button({
                type: 'submit',
                id: 'button_save_avatar',
                label: 'Изменить аватар',
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
            const file = formData.get('avatar');
            if (file instanceof File) {
                if (file.size > 5000) {
                    throw new Error('Слишком большой файл');
                }
                if (file.type.match('image.*')) {
                    await userController.changeAvatar(file);
                }
            }
        }
    }

    render() {
        return `
            <form action="/" method="post" enctype="multipart/form-data">
                {{{FormField}}}
                {{{ButtonSubmit}}}
            </form>
        `;
    }
}
