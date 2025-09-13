import './style.pcss';
import Block from '@/utils/block';
import {Nav, ProfileRow} from "@/components";
import {getLabelByName, profileData} from "@/utils/data";
import {ProfileEdit} from "@/components/profile-edit";
import {ProfileChangePassword} from "@/components/profile-change-password";

export class Profile extends Block {
    constructor({...props}) {
        const profile = Object.entries(profileData).map(([key, value]) => {
            return new ProfileRow({
                prop: getLabelByName(key),
                value: value,
            });
        });
        super({
            ...props,
            Navigation: new Nav({...props}),
            ProfileEdit: new ProfileEdit({}),
            ProfileChangePassword: new ProfileChangePassword({}),
            ProfileRows: profile,
            events: {
                click: (e: Event) => {
                    if (
                        e.target instanceof HTMLElement
                        && e.target.classList.contains('popup_link')
                        && e.target.dataset
                        && typeof e.target.dataset.target === 'string'
                    ) {
                        e.preventDefault();
                        const element: HTMLElement | null = document.getElementById(e.target.dataset.target);
                        if (element) {
                            element.classList.add('active');
                        }
                    }
                    const openedModal = document.querySelector('.popup_modal.active');
                    if (
                        e.target instanceof HTMLElement
                        && e.target.classList.contains('popup_modal_close')
                        && openedModal
                    ) {
                        openedModal.classList.remove('active');
                    }
                }
            }
        });
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Профиль</h1>
                        <div class="profile">
                            <div class="profile_head">
                                <img src="/images/user.webp" alt="Игнат Ёжиков" class="profile_image"/>
                                <h2 class="profile_name">Игнат Ёжиков</h2>
                            </div>
                            <div class="profile_info">
                                {{Test}}
                                {{{ProfileRows}}}
                            </div>
                            <div class="profile_info">
                                <div class="popup">
                                    <div class="popup_link profile_action" id="change_profile" data-target="modal_change_profile">
                                        Изменить данные
                                    </div>
                                    <div class="popup_modal" id="modal_change_profile">
                                        <div class="popup_modal_content">
                                            <div class="profile_modal profile_edit">
                                                {{{ProfileEdit}}}
                                                <div class="popup_modal_close">✕</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popup">
                                    <div class="popup_link profile_action" id="change_password" data-target="modal_change_password">
                                        Изменить пароль
                                    </div>
                                    <div class="popup_modal" id="modal_change_password">
                                        <div class="popup_modal_content">
                                             <div class="profile_modal profile_change_pass">
                                                {{{ProfileChangePassword}}}
                                                <div class="popup_modal_close">✕</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile_action profile_logout nav_list_item" data-link="Auth" id="profile_logout">Выйти</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
