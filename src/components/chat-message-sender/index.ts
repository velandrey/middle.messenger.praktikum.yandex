import Block from '@/utils/block'
import {FormValidator} from "@/utils/validator";

export class ChatMessageSender extends Block {
    constructor(props: object) {
        super({
            ...props,
            events: {
                submit: (e: Event) => this.submitCallback(e)
            }
        })
    }

    submitCallback(e: Event) {
        e.preventDefault()
        if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const arResult: Record<string, string> = {};
            formData.forEach((value: FormDataEntryValue, nameField: string) => {
                arResult[nameField] = value.toString();
            });
            const validator = new FormValidator();
            const validationResult = validator.validateForm(arResult);
            if (validationResult.isValid) {
                console.log('Корректные данные для авторизации: ', arResult)
            } else {
                console.error('Обнаружены ошибки ввода: ', validationResult.errors);
            }
        }
    }

    render() {
        return `
            <form class="chat_box_sending" method="post" action="/">
                <div class="chat_box_sending_attach">
                    <input type="hidden" name="message_attach">
                </div>
                <div class="chat_box_sending_message">
                    <input type="text" name="message" id="message" placeholder="Сообщение" class="chat_box_sending_message_input" required/>
                </div>
                <button type="submit" class="chat_box_sending_submit">➤</button>
            </form>
        `;
    }
}
