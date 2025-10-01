import store from "@/utils/store";
import chatApi from "@/api/chat-api";


class ChatController {
    public async getChats() {
        try {
            store.set('loading', true);
            const response = await chatApi.getChats();
            if (response === 'OK') {
                // [
                //     {
                //         "id": 123,
                //         "title": "my-chat",
                //         "avatar": "/123/avatar1.jpg",
                //         "unread_count": 15,
                //         "created_by": 12345,
                //         "last_message": {
                //             "user": {
                //                 "first_name": "Petya",
                //                 "second_name": "Pupkin",
                //                 "avatar": "/path/to/avatar.jpg",
                //                 "email": "my@email.com",
                //                 "login": "userLogin",
                //                 "phone": "8(911)-222-33-22"
                //             },
                //             "time": "2020-01-02T14:22:22.000Z",
                //             "content": "this is message content"
                //         }
                //     }
                // ]
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async createChat(title:string) {
        try {
            store.set('loading', true);
            const response = await chatApi.createChat(title);
            if (response === 'OK') {
                // {
                //     "id": 0
                // }
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async deleteChat(chatId:number) {
        try {
            store.set('loading', true);
            const response = await chatApi.deleteChat(chatId);
            if (response === 'OK') {
                // {
                //     "userId": 12,
                //     "result": {
                //     "id": 123,
                //         "title": "deleted-chat",
                //         "avatar": "/123/avatar1.jpg",
                //         "created_by": 12345
                // }
                // }
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async getNewMessagesCount(chatId:number) {
        try {
            store.set('loading', true);
            const response = await chatApi.getNewMessagesCount(chatId);
            if (response === 'OK') {
                // {
                //     "unread_count": 12
                // }
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async addUserToChat(userId:number,chatId:number) {
        try {
            store.set('loading', true);
            const response = await chatApi.addUserToChat(userId,chatId);
            if (response === 'OK') {

            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async removeUserFromChat(userId:number,chatId:number) {
        try {
            store.set('loading', true);
            const response = await chatApi.removeUserFromChat(userId,chatId);
            if (response === 'OK') {

            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
    public async getToken(chatId:number) {
        try {
            store.set('loading', true);
            const response = await chatApi.getToken(chatId);
            if (response === 'OK') {
                // [
                //     {
                //         "token": "string"
                //     }
                // ]
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
}

export default new ChatController();
