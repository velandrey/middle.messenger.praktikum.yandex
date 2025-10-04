import {BaseAPI} from "@/utils/api/base-api";

class ChatApi extends BaseAPI {
    constructor() {
        super('/chats');
    }

    public getChats(offset = 0, limit = 999, title = '') {
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

    public deleteChatUsers(chatId: number, userId: number) {
        this.options.data = {
            users: [userId],
            chatId: chatId
        };

        return this.delete('/users', this.options);
    }

    public getNewMessagesCount(chatId:number) {
        return this.get(`/new/${chatId}`, this.options);
    }

    public getChatUsers(chatId:number) {
        return this.get(`/${chatId}/users`, this.options);
    }

    public addUserToChat(userId:number,chatId:number) {
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

    public changeAvatar(file:File, chatId:number) {
        return this.put('/avatar', {data: {avatar: file, chatId: chatId}});
    }

    public getToken(chatId:number) {
        return this.post(`/token/${chatId}`, this.options);
    }
}

export default new ChatApi();
