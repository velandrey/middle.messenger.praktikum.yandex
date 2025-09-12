import './style.pcss';
import Block from '@/utils/block';

export class ProfileRow extends Block {
    constructor({...props}: object) {
        super({...props});
    }

    render() {
        return `
            <div class="profile_info_row">
                <div class="profile_info_row_prop">{{prop}}</div>
                <div class="profile_info_row_value">{{value}}</div>
            </div>
        `;
    }
}
