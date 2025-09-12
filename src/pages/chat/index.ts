import './style.pcss';
import Block from '@/utils/block';
import {ChatListItem, ChatMessageRow, ChatMessageSender, Nav} from "@/components";
import {chatList} from "@/utils/data";
import {Discussant, Message} from "@/utils/types";

const getChatList = (activeChatId: number = 1): {
    list: Discussant[];
    messages: Message[] | []
} => {
    let messages: Message[] | [] = [];

    const list: Discussant[] = chatList.map((item: Discussant) => {
        const chatParams = {...item};
        chatParams.active = '';
        if (item.id === activeChatId) {
            chatParams.active = 'active';
            messages = item.messages;
        }
        return chatParams;
    });
    return {list, messages};
};

export class Chat extends Block {
    constructor({...props}) {
        const {list, messages} = getChatList();
        super({
            ...props,
            Navigation: new Nav({...props}),
            ChatListBlocks: list.map((item) => {
                return new ChatListItem({...item});
            }),
            ChatMessages: messages.map((item) => {
                return new ChatMessageRow({...item});
            }),
            ChatMessageSender: new ChatMessageSender({}),
        });
    }

    render() {
        return `
            <div class="wrapper">
                {{{Navigation}}}
                <main class="app_box">
                    <div class="chat">
                        <div class="chat_list">
                            <div class="chat_list_head">
                                <div class="chat_list_head_profile">
                                    <a href="#" class="chat_list_head_profile_link nav_list_item" data-link="Profile">Профиль</a>
                                </div>
                                <form class="chat_list_head_search" action="/" method="post">
                                    <input type="text" name="search" id="search" placeholder="Поиск" class="chat_list_head_search_input" required/>
                                </form>
                            </div>
                            <div class="chat_list_body">
                                {{{ChatListBlocks}}}
                            </div>
                        </div>
                        <div class="chat_box">
                            <div class="chat_box_head">
                                <div class="chat_box_head_partner">
                                    <img src="/images/user.webp" alt="Рафик Непричёмкин" class="chat_box_head_partner_avatar">
                                    Рафик Непричёмкин
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
