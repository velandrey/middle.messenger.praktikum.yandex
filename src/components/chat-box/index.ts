import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import store from "@/utils/store";
import {hoc} from "@/utils/hoc";
import {Chat, Message, State} from "@/utils/types";
import {ChatMessageRow, ChatMessageSender, chatSearch, chatUsersList} from "@/components";
import {defaultPath, URL} from "@/utils/data";
import MessageController from "@/controllers/message-controller";
import isEqual from "@/utils/is-equal";
import ChatRemove from "@/components/chat-remove";
import {openModalCallback} from "@/utils/modal";
import {ChangeAvatar} from "@/components/change-avatar";

function constructChatMessages(arMessages: Message[]) {
    const chatPartnerUserId = store.getState().chatPartnerUserId;
    return arMessages.map((item: Message) => {
        const direction = (chatPartnerUserId === item.user_id) ? 'to' : 'from';
        const status = (item.is_read) ? 'read' : 'unread';
        let time = '';
        if (item.time && 'time' in item && typeof (item.time) === 'string') {
            const date = new Date(item.time);
            const h = (date.getHours() < 10 ? '0' : '') + date.getHours();
            const m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            time = `${h}:${m}`;
        }
        return new ChatMessageRow({
            direction: direction,
            type: item.type,
            time: time,
            status: status,
            content: item.content,
        });
    });
}

async function loadConnection(userId: number, activeChatId: number) {
    const msgSocket: MessageController = new MessageController(userId, activeChatId);
    await msgSocket.init();
    store.set('msgSocket', msgSocket);
}

class ChatBox extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            name: '',
            image: '',
            ChatChangeAvatar: new ChangeAvatar({target: 'chat'}),
            Search: new chatSearch({}),
            ChatUsersList: new chatUsersList({}),
            ChatMessages: constructChatMessages([]),
            ChatMessageSender: new ChatMessageSender(),
            ChatRemove: new ChatRemove({}),
            events: {
                click: (e) => openModalCallback(e)
            }
        });
    }


    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        const userId = store.getState().user?.id;
        const activeChatId = store.getState().chatIdActive;
        const activeChatUserInfo = store.getState().chatList.find((value: Chat) => value.id === activeChatId);
        if (activeChatId && activeChatUserInfo && userId && oldProps.chatIdActive !== newProps.chatIdActive) {
            if (store.getState().msgSocket instanceof MessageController) {
                store.getState().msgSocket?.close();
            }
            newProps.name = activeChatUserInfo.title;
            newProps.image = (activeChatUserInfo.avatar) ? `${URL.API}/resources${activeChatUserInfo.avatar}` : defaultPath.avatar;
            loadConnection(userId, activeChatId);
        }
        if (
            Array.isArray(oldProps.messages)
            && Array.isArray(newProps.messages)
            && !isEqual(oldProps.messages, newProps.messages)
        ) {
            const msgBlocks = constructChatMessages(newProps.messages);
            this.setProps({ChatMessages: msgBlocks});
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <div class="chat_box">
                <div class="chat_box_head">
                    <div class="chat_box_head_partner">
                        <img src="{{image}}" alt="{{name}}" class="chat_box_head_partner_avatar">
                        {{name}}
                    </div>
                    
                    
                    <div class="chat_box_head_changer popup_link" id="change_profile" data-target="modal_change_chat_avatar">
                        Изменить аватар
                    </div>
                    <div class="popup_modal" id="modal_change_chat_avatar">
                        <div class="popup_modal_content">
                            <div class="profile_modal profile_edit">
                                {{{ChatChangeAvatar}}}
                                <div class="popup_modal_close">✕</div>
                            </div>
                        </div>
                    </div>
                    <div class="chat_box_head_changer popup_link" id="change_profile" data-target="modal_change_chat_add_user">
                        Добавить пользователя
                    </div>
                    <div class="popup_modal" id="modal_change_chat_add_user">
                        <div class="popup_modal_content">
                            <div class="profile_modal profile_edit">
                                <div class="chat_search_users">
                                    {{{Search}}}
                                </div>
                                <div class="popup_modal_close">✕</div>
                            </div>
                        </div>
                    </div>
                    {{{ChatRemove}}}
                </div>
                <div class="chat_users_list">
                    {{{ChatUsersList}}}
                </div>
                <div class="chat_box_feed">
                    {{{ChatMessages}}}
                </div>
                {{{ChatMessageSender}}}
            </div>
        `;
    }
}


export const chatBox = hoc(
    state =>
        ({
            chatIdActive: state.chatIdActive,
            messages: state.messages,
        }) as State
)(ChatBox);
