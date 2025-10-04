import './style.pcss';
import Block from '@/utils/block';
import chatController from "@/controllers/chat-controller";
import store from "@/utils/store";


export class ChatUsersListItem extends Block {
    constructor({...props}: object) {
        let userName = 'User';
        if ('display_name' in props && typeof props.display_name === 'string' && props.display_name.length > 0) {
            userName = props.display_name;
        } else if('first_name' in props && 'second_name' in props && typeof props.first_name === 'string' && typeof props.second_name === 'string'){
            userName = `${props.first_name} ${props.second_name}`;
        }
        const userId = ('id' in props) ? props.id : 0;
        super({
            userName: userName,
            userId: userId,
            ...props,
            events: {
                click: async (e)=>{
                    if (
                        e.target instanceof HTMLElement
                        && e.target.classList.contains('user_in_chat_remove')
                        && e.target.dataset
                        && 'userid' in e.target.dataset
                        && typeof e.target.dataset.userid === 'string'
                    ) {
                        const userId = parseInt(e.target.dataset.userid);
                        const chatId = store.getState().chatIdActive;
                        if(userId && chatId){
                            await chatController.deleteChatUsers(chatId,userId);
                        }
                    }
                }
            }
        });
    }

    render() {
        return `
            <span class="user_in_chat">
                {{userName}}
                <span class="user_in_chat_remove" data-userid="{{userId}}">✕</span>
            </span>
        `;
    }
}
