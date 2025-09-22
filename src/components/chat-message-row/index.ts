import './style.pcss';
import Block from '@/utils/block';

export class ChatMessageRow extends Block {
    constructor({ ...props }:object) {
        super({...props});
    }

    render() {
        return `
            <div class="chat_message {{direction}}">
                <div class="chat_message_box">
                    <div class="chat_message_box_content">
                        {{content}}
                    </div>
                    <div class="chat_message_box_info">
                        <div class="chat_message_box_info_time">{{time}}</div>
                        <div class="chat_message_box_info_status {{status}}"></div>
                    </div>
                </div>
            </div>
        `;
    }
}
