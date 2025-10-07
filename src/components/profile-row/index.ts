import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import {hoc} from "@/utils/hoc";
import {State, UserInfo} from "@/utils/types";
import store from "@/utils/store";


export class ProfileRow extends Block {
    constructor({...props}: object) {
        super({...props});
    }

    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        function isValidUserInfoKey(key: string): key is keyof NonNullable<UserInfo> {
            return [
                'id', 'avatar', 'display_name', 'email',
                'first_name', 'second_name', 'login', 'phone'
            ].includes(key);
        }

        const user: UserInfo | null = store.getState().user;
        if (user && 'name' in newProps) {
            const key = newProps.name;
            if (typeof key === 'string' && isValidUserInfoKey(key) && user[key] !== null) {
                newProps.value = user[key];
            }
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <div class="profile_info_row">
                <div class="profile_info_row_prop">{{title}}</div>
                <div class="profile_info_row_value">{{value}}</div>
            </div>
        `;
    }
}

export const profileRow = hoc(
    state =>
        ({
            user: state.user,
        }) as State
)(ProfileRow);
