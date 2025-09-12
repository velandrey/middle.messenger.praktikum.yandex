import './style.pcss';
import Block from '@/utils/block'

export class ChatListItem extends Block {
    constructor({ ...props }:object) {
        super({...props})
    }

    render() {
        return `
            <div class="chat_list_item {{active}}">
                <div class="chat_list_item_main">
                    <div class="chat_list_item_avatar">
                        <img src="{{image}}" alt="{{name}}">
                    </div>
                    <div class="chat_list_item_text">
                        <div class="chat_list_item_text_name">{{name}}</div>
                        <div class="chat_list_item_text_preview">{{text}}</div>
                    </div>
                </div>
                <div class="chat_list_item_info">
                    <div class="chat_list_item_info_date">{{date}}</div>
                    <div class="chat_list_item_info_count">{{count}}</div>
                </div>
            </div>
        `;
    }
}
