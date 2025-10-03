import './style.pcss';
import Block from '@/utils/block';
import store from "@/utils/store";

export class ChatListItem extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    if (e?.target instanceof HTMLElement) {
                        const chatItem = e.target.closest('.chat_list_item');
                        if (chatItem instanceof HTMLElement && chatItem.dataset.chatid) {
                            const chatId = parseInt(chatItem.dataset.chatid);
                            if (!isNaN(chatId) && chatId > 0) {
                                store.set('chatIdActive', chatId);
                                store.set('messages', []);
                            }
                        }
                    }
                }
            }
        });
    }

    render() {
        return `
            <div class="chat_list_item {{active}}" data-chatid="{{id}}">
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
