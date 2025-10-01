import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import {Logout, profileEdit, profileRow} from "@/components";
import {getLabelByName} from "@/utils/data";
import {ProfileChangePassword} from "@/components/profile-change-password";
import {hoc} from "@/utils/hoc";
import {State, UserInfo} from "@/utils/types";


function getFullName(user: UserInfo):string{
    return (user) ? `${user.first_name} ${user.second_name}`: '';
}
const fieldsProfileRows = [
    'first_name',
    'second_name',
    'email',
    'login',
    'phone'
] as const;

const defaultAvatarLink = '/images/user.webp';

function profileRowConstructor(){
    const arProfilesBlocks = [];
    for(const fieldName of fieldsProfileRows){
        const block = new profileRow({
            name: fieldName,
            title: getLabelByName(fieldName)
        });
        arProfilesBlocks.push(block);
    }
    return arProfilesBlocks;
}

export class Profile extends Block {
    constructor({...props}) {
        const { user = {} } = props;
        super({
            ...props,
            ProfileEdit: new profileEdit({}),
            ProfileChangePassword: new ProfileChangePassword({}),
            ProfileRows: profileRowConstructor(),
            Logout: new Logout({}),
            UserName: getFullName(user),
            Avatar: defaultAvatarLink,
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

    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        if(newProps.user && typeof newProps.user === 'object') {
            newProps.UserName = getFullName(newProps.user as UserInfo);
            if('avatar' in newProps.user && newProps.user.avatar){
                newProps.Avatar = newProps.user.avatar;
            } else {
                newProps.Avatar = defaultAvatarLink;
            }
        }

        return super.componentDidUpdate(oldProps, newProps);
    }
    render() {
        return `
            <div class="wrapper">
                <main class="app_box">
                    <div class="box_wrapper">
                        <h1 class="main_title">Профиль</h1>
                        <div class="profile">
                            <div class="profile_head">
                                <img src="{{Avatar}}" alt="{{UserName}}" class="profile_image"/>
                                <h2 class="profile_name">{{UserName}}</h2>
                            </div>
                            <div class="profile_info">
                                {{{Loading}}}
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
                                {{{Logout}}}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
export const profilePage = hoc(
    state =>
        ({
            user: state.user,
        }) as State
)(Profile);
