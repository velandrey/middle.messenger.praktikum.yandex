import './style.pcss';
import Block from '@/utils/block';
import {ChatListItem, ChatMessageRow, ChatMessageSender, ChatSearch} from "@/components";
import {chatList} from "@/utils/data";
import {Discussant, Message} from "@/utils/types";
import {Routes} from "@/utils/router/routes";

const getChatList = (activeChatId: number = 1): {
    list: Discussant[];
    messages: Message[] | []
    name: string
    image: string
} => {
    let messages: Message[] | [] = [];
    let name: string = '';
    let image: string = '';

    const list: Discussant[] = chatList.map((item: Discussant) => {
        const chatParams = {...item};
        chatParams.active = '';
        if (item.id === activeChatId) {
            chatParams.active = 'active';
            messages = item.messages;
            name = item.name;
            image = item.image;
        }
        return chatParams;
    });
    return {list, messages, name, image};
};

export class Chat extends Block {
    constructor({...props}) {
        if (!props.chatId) {
            props.chatId = 1;
        }
        const {list, messages, name, image} = getChatList(props.chatId);
        super({
            ...props,
            name: name,
            image: image,
            Search: new ChatSearch({}),
            ChatListBlocks: list.map((item) => {
                return new ChatListItem(item);
            }),
            ChatMessages: messages.map((item) => {
                return new ChatMessageRow(item);
            }),
            ChatMessageSender: new ChatMessageSender({
                chatId: props.chatId
            }),
            events: {
                click: (e: Event) => {
                    if (e.target instanceof HTMLElement) {
                        const chatListItem = e.target.closest('.chat_list_item');
                        if (chatListItem instanceof HTMLElement && chatListItem.dataset.chatid) {
                            const chatId: number = parseInt(chatListItem.dataset.chatid);
                            this.props.chatId = chatId;
                            const {list, messages, name, image} = getChatList(chatId);
                            this.props.name = name;
                            this.props.image = image;
                            this.lists.ChatListBlocks = list.map((item) => {
                                return new ChatListItem(item);
                            });
                            this.lists.ChatMessages = messages.map((item) => {
                                return new ChatMessageRow(item);
                            });
                            this.children.ChatMessageSender = new ChatMessageSender({
                                chatId: props.chatId
                            });
                        }
                    }
                }
            }
        });
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
                        <div class="chat_box">
                            <div class="chat_box_head">
                                <div class="chat_box_head_partner">
                                    <img src="{{image}}" alt="{{name}}" class="chat_box_head_partner_avatar">
                                    {{name}}
                                </div>
                <!--                <div class="chat_box_head_menu">⋮</div>-->
                            </div>
                            <div class="chat_box_feed">
                                {{{ChatMessages}}}
                            </div>
                            {{{ChatMessageSender}}}
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
