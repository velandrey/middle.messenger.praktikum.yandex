import Block from '@/utils/block'
import {FormAuth, Nav} from "@/components";

export class Auth extends Block {
    constructor({...props}) {
        super({
            ...props,
            Navigation: new Nav({...props}),
            FormAuth: new FormAuth({...props})
        })
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Авторизация</h1>
                        {{{FormAuth}}}
                        <div class="form_field_link">
                            <a href="#" class="form_field_link_auth nav_list_item" data-link="Registration">Регистрация</a>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
