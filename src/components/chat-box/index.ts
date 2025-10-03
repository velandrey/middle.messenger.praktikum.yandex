import './style.pcss';
import Block, {TypeProps} from '@/utils/block';
import store from "@/utils/store";
import {hoc} from "@/utils/hoc";
import {Chat, Message, State} from "@/utils/types";
import {ChatMessageRow, ChatMessageSender} from "@/components";
import {defaultPath} from "@/utils/data";
import MessageController from "@/controllers/message-controller";
import isEqual from "@/utils/is-equal";
import ChatRemove from "@/components/chat-remove";

function constructChatMessages(arMessages: Message[]) {
    const chatPartnerUserId = store.getState().chatPartnerUserId;
    return arMessages.map((item: Message) => {
        const direction = (chatPartnerUserId === item.user_id) ? 'to' : 'from';
        const status = (item.is_read) ? 'read' : 'unread';
        const date = new Date(item.time);
        return new ChatMessageRow({
            direction: direction,
            type: item.type,
            time: `${date.getHours()}:${date.getMinutes()}`,
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
            ChatMessages: constructChatMessages([]),
            ChatMessageSender: new ChatMessageSender(),
            ChatRemove: new ChatRemove({}),
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
            newProps.image = activeChatUserInfo.avatar || defaultPath.avatar;
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
                    {{{ChatRemove}}}
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
