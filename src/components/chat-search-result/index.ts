import './style.pcss';
import Block from '@/utils/block';
import store from "@/utils/store";

export type StrictComponentProps = {
    id: number;
    first_name: string;
    second_name: string;
    clear: () => void;
}
export class ChatSearchResult extends Block {
    constructor({ ...props }:StrictComponentProps) {
        const { id, first_name, second_name, clear } = props;
        const finalParams = {
            id,
            first_name,
            second_name,
            clear,
            events: {
                click: () => {
                    store.set('chat_partner_user_id', id);
                    clear();
                }
            }
        };
        super({
            ...finalParams,
            events: {
                click: function (){
                    store.set('chat_partner_user_id', finalParams.id);
                    finalParams.clear();
                }
            }
        });
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
