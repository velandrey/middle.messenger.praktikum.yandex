import ChatController from "@/controllers/chat-controller";
import store from "@/utils/store";

// Если вы увидели в консоли, что код 1006 и сокет закрылся, — это означает,
// что вы долго были не активны и он это сделал автоматически. Чтобы избежать этого,
// необходимо делать “ping” (например, отправлять пустое сообщение). Это покажет, что
// вы не «отвалились» от чата. Для переподключения сделайте новый запрос на connect.


class MessageController {
    private readonly BASE_URL = 'wss://ya-praktikum.tech/ws/chats';
    private socket: WebSocket | null = null;

    public async init(userId: number, chatId: number) {
        try {
            await this.connect(userId, chatId);
            this.addListeners();
        } catch (error) {
            console.log(error);
        }
    }

    private async connect(userId: number, chatId: number) {
        try {
            const tokenId = await ChatController.getToken(chatId);
            this.socket = new WebSocket(`${this.BASE_URL}/${userId}/${chatId}/${tokenId}`);
        } catch (error) {
            console.log(error);
            throw Error('Невозможно подключиться');
        }
    }

    private addListeners() {
        if (this.socket) {
            this.socket.addEventListener('open', () => {
                console.log('Соединение установлено');
            });

            this.socket.addEventListener('close', event => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            this.socket.addEventListener('message', event => {
                console.log('Получены данные', event.data);
                try {
                    const data = JSON.parse(event.data);
                    store.set('messages', data);
                } catch (error) {
                    console.log('Ошибка при получении данных', error);
                }
            });

            this.socket.addEventListener('error', event => {
                console.log('Ошибка', event);
            });
        }
    }

    private send(type: string, content: string) {
        if (!this.socket) {
            throw Error('WebSocket не подключен');
        }
        this.socket.send(JSON.stringify({
            content: content,
            type: type,
        }));

    }

    public sendMessage(text: string) {
        this.send('message', text);
    }

    public getOldMessage(offset: number) {
        // offset - Число, которое показывает с какого сообщения нужно отдать ещё 20
        this.send('get old', offset.toString());
    }

    public close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }


}

export default new MessageController();
