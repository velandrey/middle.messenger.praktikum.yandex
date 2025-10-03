import store from "@/utils/store";
import chatApi from "@/api/chat-api";


class ChatController {
    public async getChats() {
        try {
            store.set('loading', true);
            const response = await chatApi.getChats();
            if (response.length > 0) {
                store.set('chatList', [...response]);
                store.set('chatIdActive', response[0].id);
                return response;
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
            console.log('createChat',response);
            if ('id' in response) {
                return response.id;
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
            console.log(response)
            if (response.result.id) {
                store.set('chatIdActive',null);
                store.set('chatPartnerUserId',null);
                store.set('msgSocket',null);
                store.set('messages',[]);
                this.getChats();
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
            console.log('addUserToChat',response);
            if (response === 'OK') {
                return true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
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
            if (response.token) {
                return response.token;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
    }
}

export default new ChatController();
