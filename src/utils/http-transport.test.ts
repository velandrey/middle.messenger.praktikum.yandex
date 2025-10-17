import {HttpStatus, HTTPTransport, queryStringify} from "@/utils/http-transport";
import {URL} from "@/utils/data";

class MockXMLHttpRequest {
    public onload: (() => void) | null = null;
    public onerror: (() => void) | null = null;
    public ontimeout: (() => void) | null = null;
    public onabort: (() => void) | null = null;
    public status = 0;
    public timeout = 0;
    public withCredentials = false;
    public method = '';
    public url = '';
    public requestBody: unknown = null;

    open(method: string, url: string): void {
        this.method = method;
        this.url = url;
    }

    send(body?: unknown): void {
        this.requestBody = body;
        setTimeout(() => {
            if (this.onload) this.onload();
        }, 0);
    }

    initSuccess(status: number = HttpStatus.Ok): void {
        this.status = status;
        if (this.onload) this.onload();
    }

    initError(): void {
        if (this.onerror) this.onerror();
    }

    initTimeout(): void {
        if (this.ontimeout) this.ontimeout();
    }
}

describe('HTTPTransport', () => {
    let httpTransport: HTTPTransport;
    let mockXHR: MockXMLHttpRequest;

    beforeEach(() => {
        httpTransport = new HTTPTransport();
        mockXHR = new MockXMLHttpRequest();
        global.XMLHttpRequest = jest.fn(() => mockXHR as unknown as XMLHttpRequest) as unknown as typeof XMLHttpRequest;
    });

    describe('Все методы запросов определены', () => {
        it('GET', () => {
            expect(httpTransport.get).toBeDefined();
        });
        it('POST', () => {
            expect(httpTransport.post).toBeDefined();
        });
        it('PUT', () => {
            expect(httpTransport.put).toBeDefined();
        });
        it('DELETE', () => {
            expect(httpTransport.delete).toBeDefined();
        });
    });

    describe('Запросы корректно срабатывают', () => {
        it('В XMLHttpRequest формируется правильный метод', async () => {
            const promise = httpTransport.post('/chats', {});
            mockXHR.initSuccess();
            await promise;
            expect(mockXHR.method).toBe('POST');
        });
        it('Правильно обрабатываются ошибки соединения', async () => {
            const promise = httpTransport.post('/chats', {});
            mockXHR.initError();
            await expect(promise).rejects.toThrow(`Ошибка соединения с ${URL.API}/chats`);
        });
        it('Правильно обрабатываются запрос неавторизованного пользователя', async () => {
            const promise = httpTransport.get('/notfound');
            mockXHR.initSuccess(HttpStatus.Unauthorized);
            await expect(promise).rejects.toThrow(`Запрос к ${URL.API}/notfound не удался. Статус: ${HttpStatus.Unauthorized}`);
        });
        it('Прерывание в случае превышения timeout', async () => {
            const promise = httpTransport.post('/chats', {timeout: 10});
            mockXHR.initTimeout();
            await expect(promise).rejects.toThrow(`Таймаут запроса к ${URL.API}/chats после 0 попыток`);
        });
    });
});

describe('queryStringify', () => {
    it('Формирование строки запроса', () => {
        const data = {offset: 3, limit: 21, title: 'ChatTitle'};
        const result = queryStringify(data);
        expect(result).toBe('?offset=3&limit=21&title=ChatTitle');
    });
    it('Используются спецсимволы', () => {
        const data = {title: 'Где тесты'};
        const result = queryStringify(data);
        expect(result).toBe('?title=%D0%93%D0%B4%D0%B5+%D1%82%D0%B5%D1%81%D1%82%D1%8B');
    });
});
