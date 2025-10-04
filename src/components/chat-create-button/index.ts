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
                    let title = prompt('Введите название чата');
                    if(title){
                        title = title.replace(/[^\w\s]/gi, '');
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
