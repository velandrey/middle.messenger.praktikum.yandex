import './style.pcss';
import Block from '@/utils/block';
import chatController from "@/controllers/chat-controller";
import store from "@/utils/store";
export default class ChatRemove extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            events: {
                click: (e)=>{
                    e.preventDefault();
                    if(confirm('Подтвердите удаление чата')) {
                        const chatIdActive = store.getState().chatIdActive;
                        if(chatIdActive){
                            chatController.deleteChat(chatIdActive);
                        }
                    }
                }
            }
        });
    }

    render() {
        return `
            <div class="chat_box_head_remove" title="Удалить чат"></div>
        `;
    }
}
