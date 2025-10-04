import './style.pcss';
import Block from '@/utils/block';
import chatController from "@/controllers/chat-controller";

export class ChatCreateButton extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            events: {
                click: async (e)=>{
                    e.preventDefault();
                    const defaultTitle = 'New chat';
                    let title = prompt('Введите название чата', defaultTitle);
                    if(title){
                        title = title.replace(/[^a-zA-Z0-9\s]/g, '').trim() || defaultTitle;
                        await chatController.createChat(title);
                        await chatController.getChats();
                    }
                }
            }
        });
    }

    render() {
        return `
            <button class="chat_create_button">Создать чат</button>
        `;
    }
}
