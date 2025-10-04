import './style.pcss';
import Block from '@/utils/block';
import store from "@/utils/store";
import chatController from "@/controllers/chat-controller";
import {closeModal} from "@/utils/modal";

export type StrictComponentProps = {
    id: number;
    first_name: string;
    second_name: string;
    clear: () => void;
}

export class ChatSearchResult extends Block {
    constructor({...props}: StrictComponentProps) {
        const {id, first_name, second_name} = props;
        const finalParams = {
            id,
            first_name,
            second_name,
            events: {
                click: async () => {
                    const chatId = store.getState().chatIdActive;
                    if (chatId) {
                        const addUserToChat = await chatController.addUserToChat(id, chatId);
                        if (addUserToChat) {
                            await chatController.getChats();
                            store.set('search', '');
                            store.set('searchUsers', []);
                            store.set('chatPartnerUserId', id);
                            store.set('chatIdActive', chatId);
                            closeModal();
                        }
                    }
                }
            }
        };
        super(finalParams);
    }

    render() {
        return `
            <div class="chat_list_head_search_result_item">
                <div class="chat_list_head_search_result_item_text">{{id}}: {{first_name}} {{second_name}}</div>
                <div class="chat_list_head_search_result_add">Добавить</div>
            </div>
        `;
    }
}
