import './style.pcss';
import Block from '@/utils/block';
import debounce from "@/utils/debounce";
import userController from "@/controllers/user-controller";
import {ChatSearchResult, StrictComponentProps} from "@/components/chat-search-result";


async function callbackSearch(e:Event){
    if (e.target instanceof HTMLInputElement) {
        const result = (e.target.value) ? await userController.searchUsersByLogin(e.target.value) : [];
        const blockResult = document.querySelector('.chat_list_head_search_result');
        if(blockResult) {
            const clearResult = () => {
                if(blockResult) {
                    while (blockResult.firstChild) {
                        blockResult.removeChild(blockResult.firstChild);
                    }
                }
            };
            clearResult();
            for(const item of result){
                const block = new ChatSearchResult({
                    id: item.id,
                    first_name: item.first_name,
                    second_name: item.second_name,
                    clear: clearResult,
                } as StrictComponentProps);
                block.dispatchComponentDidMount();
                const html = block.getContent();
                blockResult.appendChild(html);
            }
        }
    }
}

export class ChatSearch extends Block {
    constructor({ ...props }:object) {
        super({
            ...props,
            events: {
                keyup: debounce(callbackSearch, 1000)
            }
        });
    }

    render() {
        return `
            <form class="chat_list_head_search" action="/" method="post">
                <input type="text" name="search" id="search" placeholder="Поиск" class="chat_list_head_search_input" required/>
                <div class="chat_list_head_search_result"></div>
            </form>
        `;
    }
}
