import './style.pcss';
import Block from '@/utils/block'
import {ChatListItem, ChatMessageRow, Nav} from "@/components";
import {chatList, chatMessages} from "@/utils/data";

export class Chat extends Block {
    constructor({...props}) {
        super({
            ...props,
            Navigation: new Nav({...props}),
            ChatListBlocks: chatList.map((item)=>{
                return new ChatListItem({...item})
            }),
            ChatMessages: chatMessages.map((item)=>{
                return new ChatMessageRow({...item})
            }),
        })
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
                                    <img src="/images/user.webp" alt="{{p_name}}" class="chat_box_head_partner_avatar">
                                    Рафик Непричёмкин
                                </div>
                <!--                <div class="chat_box_head_menu">⋮</div>-->
                            </div>
                            <div class="chat_box_feed">
                                {{{ChatMessages}}}
                            </div>
                            <form class="chat_box_sending" method="post" action="/">
                                <div class="chat_box_sending_attach">
                                    <input type="hidden" name="message_attach">
                                </div>
                                <div class="chat_box_sending_message">
                                    <input type="text" name="message" id="message" placeholder="Сообщение" class="chat_box_sending_message_input" required/>
                                </div>
                                <button type="submit" class="chat_box_sending_submit">➤</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}
