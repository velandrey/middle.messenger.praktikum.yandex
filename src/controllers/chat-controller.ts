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
                await this.getChatUsers(response[0].id);
                return response;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async getChatUsers(chatId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.getChatUsers(chatId);
            if (response.length > 0) {
                store.set('chatUsers', [...response]);
                return response;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async deleteChatUsers(chatId: number, userId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.deleteChatUsers(chatId, userId);
            if (response === 'OK') {
                await this.getChats();
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async createChat(title: string) {
        try {
            store.set('loading', true);
            const response = await chatApi.createChat(title);
            if ('id' in response) {
                return response.id;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async deleteChat(chatId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.deleteChat(chatId);
            if (response.result.id) {
                store.set('chatIdActive', null);
                store.set('chatPartnerUserId', null);
                store.set('msgSocket', null);
                store.set('messages', []);
                this.getChats();
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async getNewMessagesCount(chatId: number) {
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

    public async addUserToChat(userId: number, chatId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.addUserToChat(userId, chatId);
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

    public async removeUserFromChat(userId: number, chatId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.removeUserFromChat(userId, chatId);
            if (response === 'OK') {
                console.log('user removed');
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async changeAvatar(file: File, chatId: number) {
        try {
            store.set('loading', true);
            const response = await chatApi.changeAvatar(file, chatId);
            if ('id' in response) {
                await this.getChats();
                return true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
    }


    public async getToken(chatId: number) {
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
