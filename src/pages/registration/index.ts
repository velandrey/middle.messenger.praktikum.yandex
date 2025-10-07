import Block from '@/utils/block';
import {FormRegistration} from "@/components/form-registration";
import {Routes} from "@/utils/router/routes";

export class Registration extends Block {
    constructor({...props}) {
        super({
            ...props,
            FormRegistration: new FormRegistration({...props})
        });
    }

    render() {
        return `
            <div class="wrapper">
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Регистрация</h1>
                        {{{FormRegistration}}}
                        <div class="form_field_link">
                            <a href="${Routes.ROOT}" class="form_field_link_auth nav_list_item">Войти</a>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
