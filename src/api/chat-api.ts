import {BaseAPI} from "@/utils/api/base-api";

class ChatApi extends BaseAPI {
    constructor() {
        super('/chats');
    }

    public getChats(offset = 0, limit = 5, title = '') {
        this.options.data = {
            offset: offset,
            limit: limit,
            title: title,
        };

        return this.get('', this.options);
    }

    public createChat(title:string) {
        this.options.data = {
            title: title
        };

        return this.post('', this.options);
    }

    public deleteChat(chatId:number) {
        this.options.data = {
            chatId: chatId
        };

        return this.delete('', this.options);
    }
    public getNewMessagesCount(chatId:number) {
        this.options.data = {
            id: chatId
        };

        return this.get('', this.options);
    }

    public addUserToChat(userId:number,chatId:number) {
        //Возможно допустить число или массив чисел
        this.options.data = {
            users:[userId],
            chatId:chatId,
        };

        return this.put('/users', this.options);
    }

    public removeUserFromChat(userId:number,chatId:number) {
        this.options.data = {
            users:[userId],
            chatId:chatId,
        };

        return this.delete('/users', this.options);
    }
}

export default new ChatApi();
