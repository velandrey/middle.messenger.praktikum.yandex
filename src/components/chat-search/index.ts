import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import debounce from "@/utils/debounce";
import userController from "@/controllers/user-controller";
import {ChatSearchResult, StrictComponentProps} from "@/components/chat-search-result";
import {State, UserInfo} from "@/utils/types";
import {hoc} from "@/utils/hoc";


function constructSearchResultsBlock(arUsers:UserInfo[]){
    const arBlocks = [];
    for(const item of arUsers){
        const block = new ChatSearchResult({
            id: item.id,
            first_name: item.first_name,
            second_name: item.second_name,
        } as StrictComponentProps);
        arBlocks.push((block));
    }
    return arBlocks;
}

export class ChatSearch extends Block {
    constructor({ ...props }) {
        const search = props.search;
        const callbackSearch = async function (e:Event) {
            if (e.target instanceof HTMLInputElement) {
                await userController.searchUsersByLogin(e.target.value);
            }
        };
        super({
            search: search,
            ChatListBlocks: constructSearchResultsBlock([]),
            events: {
                keyup: debounce(callbackSearch, 1000)
            }
        });
    }

    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        if('searchUsers' in newProps){
            const searchUsers = newProps.searchUsers;
            if(Array.isArray(searchUsers)){
                const newChatListBlocks = {SearchUsersResult: constructSearchResultsBlock(searchUsers)};
                delete newProps.searchUsers;
                this.setProps(newChatListBlocks);
            }
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <form class="chat_list_head_search" action="/" method="post">
                <input type="text" name="search" id="search" placeholder="Поиск" value="{{search}}" class="chat_list_head_search_input" required/>
                <div class="chat_list_head_search_result">{{{SearchUsersResult}}}</div>
            </form>
        `;
    }
}

export const chatSearch = hoc(
    state =>
        ({
            searchUsers: state.searchUsers,
            search: state.search,
        }) as State
)(ChatSearch);

