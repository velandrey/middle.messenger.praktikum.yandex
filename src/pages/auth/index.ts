import Block from '@/utils/block';
import {FormAuth} from "@/components";
import {Routes} from "@/utils/router/routes";

export class Auth extends Block {
    constructor({...props}) {
        super({
            ...props,
            FormAuth: new FormAuth({...props})
        });
    }

    render() {
        return `
            <div class="wrapper">
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Авторизация</h1>
                        {{{FormAuth}}}
                        <div class="form_field_link">
                            <a href="${Routes.REGISTRATION}" class="form_field_link_auth nav_list_item">Регистрация</a>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
