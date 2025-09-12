import './style.pcss';
import Block from '@/utils/block'
import {ChatListItem, ChatMessageRow, ChatMessageSender, Nav} from "@/components";
import {chatList, chatMessages} from "@/utils/data";



export class Chat extends Block {
    constructor({...props}) {
        /**
         * Доделать на промисах
         *
         const getChatList = () => {
         return new Promise((resolve,reject) => {
         setTimeout(()=>{
         resolve(chatList)
         },1000)
         setTimeout(()=>{
         reject(new Error(`Не удалось получить список чатов.`))
         },10000)
         })

         }


        let chatListItem = [];
        getChatList().then(response=>{
            console.log(response)
            if(Array.isArray(response)) {
                chatListItem = response.map((item)=>{
                    return new ChatListItem({...item})
                })
            }
            console.log(chatListItem)
        }).catch(reason => {
            chatListItem = [];
            console.log(reason)
        })
            */

        super({
            ...props,
            Navigation: new Nav({...props}),
            ChatListBlocks: chatList.map((item)=>{
                return new ChatListItem({...item})
            }),
            ChatMessages: chatMessages.map((item)=>{
                return new ChatMessageRow({...item})
            }),
            ChatMessageSender: new ChatMessageSender({}),
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
