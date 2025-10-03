import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import {ChatListItem, chatSearch} from "@/components";
import {State} from "@/utils/types";
import {Routes} from "@/utils/router/routes";
import chatController from "@/controllers/chat-controller";
import store from "@/utils/store";
import {hoc} from "@/utils/hoc";
import {chatBox} from "@/components/chat-box";
import {defaultPath} from "@/utils/data";


function createChatListBlock() {
    const chatIdActive = store.getState().chatIdActive;
    return store.getState().chatList.map((item) => {
        const text = (item.last_message && 'content' in item.last_message) ? item.last_message.content : '';
        return new ChatListItem({
            id: item.id,
            active: (chatIdActive == item.id) ? 'active' : '',
            image: item.avatar || defaultPath.avatar,
            name: item.title,
            text: text || '',
            date: item.created_by,
            count: item.unread_count,
        });
    });
}

export class Chat extends Block {
    constructor({...props}) {
        chatController.getChats();
        super({
            ...props,
            Search: new chatSearch({}),
            ChatListBlocks: createChatListBlock(),
            ChatBox: new chatBox(),
        });
    }

    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        if('chatList' in newProps){
            delete newProps.chatList;
            const newChatListBlocks = {ChatListBlocks: createChatListBlock()};
            this.setProps(newChatListBlocks);
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <div class="wrapper">
                <main class="app_box">
                    <div class="chat">
                        <div class="chat_list">
                            <div class="chat_list_head">
                                <div class="chat_list_head_profile">
                                    <a href="${Routes.PROFILE}" class="chat_list_head_profile_link">Профиль</a>
                                </div>
                                {{{Search}}}
                            </div>
                            <div class="chat_list_body">
                                {{{ChatListBlocks}}}
                            </div>
                        </div>
                        {{{ChatBox}}}
                    </div>
                </main>
            </div>
        `;
    }
}

export const chatPage = hoc(
    state =>
        ({
            chatIdActive: state.chatIdActive,
            chatList: state.chatList,
        }) as State
)(Chat);
