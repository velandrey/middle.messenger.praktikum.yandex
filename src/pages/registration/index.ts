import Block from '@/utils/block';
import {Nav} from "@/components";
import {FormRegistration} from "@/components/form-registration";

export class Registration extends Block {
    constructor({...props}) {
        super({
            ...props,
            Navigation: new Nav({...props}),
            FormRegistration: new FormRegistration({...props})
        });
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Регистрация</h1>
                        {{{FormRegistration}}}
                        <div class="form_field_link">
                            <a href="#" class="form_field_link_auth nav_list_item" data-link="Auth">Войти</a>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
