import ChatController from "@/controllers/chat-controller";
import store from "@/utils/store";
import {URL} from "@/utils/data";

export default class MessageController {
    private socket: WebSocket | null = null;
    private userId: number;
    private chatId: number;
    private intervalObjectForPing: number | null = null;

    public constructor(userId: number, chatId: number) {
        this.userId = userId;
        this.chatId = chatId;
    }


    public async init() {
        try {
            await this.connect();
            this.addListeners();
        } catch (error) {
            console.log(error);
        }
    }

    private async connect() {
        try {
            const tokenId = await ChatController.getToken(this.chatId);
            if(tokenId){
                this.socket = new WebSocket(`${URL.WS}/${this.userId}/${this.chatId}/${tokenId}`);
            }
        } catch (error) {
            console.log(error);
            throw Error('Невозможно подключиться');
        }
    }

    private addListeners() {
        if (this.socket) {
            this.socket.addEventListener('open', () => {
                // console.log('Соединение установлено');
                store.set('messages',[]);
                this.getOldMessage(0);
                this.intervalObjectForPing = setInterval(() => {
                    this.sendPing();
                }, 15000);
            });

            this.socket.addEventListener('close', event => {
                if (this.intervalObjectForPing) {
                    clearInterval(this.intervalObjectForPing);
                    this.intervalObjectForPing = null;
                }
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }
                // console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            this.socket.addEventListener('message', event => {
                try {
                    const data = JSON.parse(event.data);
                    // console.log('Получены данные', data);
                    if(Array.isArray(data) && data.length > 0){
                        store.set('messages', data.reverse());
                    } else if (data.type === 'message') {
                        store.set('messages', [...store.getState().messages, data]);
                    }
                    // else if (data.type === 'pong'){
                    //     console.log('Pong');
                    // }
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

    private sendPing() {
        this.send('ping', '');
    }

    public close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            this.socket = null;
        }
        if (this.intervalObjectForPing) {
            clearInterval(this.intervalObjectForPing);
            this.intervalObjectForPing = null;
        }
    }
}
