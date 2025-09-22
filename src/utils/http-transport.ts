export enum HttpStatus {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    MultipleChoices = 300,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
}

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
} as const;

type Method = keyof typeof METHODS;
type HTTPMethod = (typeof METHODS)[Method];

type Options = {
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
    method?: HTTPMethod;
};

/**
 * Функция для преобразования объекта в query string
 */
function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Неверный тип данных - требуется объект');
    }

    const params = new URLSearchParams();

    const addParam = (key: string, value: unknown) => {
        if (Array.isArray(value)) {
            params.append(key, value.join(','));
        } else if (typeof value === 'object' && value !== null) {
            params.append(key, JSON.stringify(value));
        } else {
            params.append(key, String(value));
        }
    };

    Object.entries(data).forEach(([key, value]) => {
        addParam(key, value);
    });

    const result = params.toString();
    return result ? `?${result}` : '';
}

export class HTTPTransport {
    // Фабричный метод для создания HTTP методов
    private createMethod(method: HTTPMethod) {
        return (url: string, options: Omit<Options, 'method'> = {}): Promise<XMLHttpRequest> => {
            return this.request(url, { ...options, method });
        };
    }

    // Методы создаются через фабрику
    public get = this.createMethod(METHODS.GET);
    public post = this.createMethod(METHODS.POST);
    public put = this.createMethod(METHODS.PUT);
    public delete = this.createMethod(METHODS.DELETE);

    private request = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        const {
            method = METHODS.GET,
            data = {},
            headers = {},
            retries = 0,
            timeout = 5000
        } = options;

        let requestUrl = url;

        if (method === METHODS.GET && data && Object.keys(data).length > 0) {
            requestUrl += queryStringify(data);
        }

        return new Promise((resolve, reject) => {
            let attemptNumber = 0;

            const makeRequest = (): void => {
                attemptNumber++;

                const xhr = new XMLHttpRequest();
                xhr.open(method, requestUrl, true);
                xhr.timeout = timeout;

                // Устанавливаем заголовки
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });

                xhr.onload = (): void => {
                    if (xhr.status >= HttpStatus.Ok && xhr.status < HttpStatus.MultipleChoices) {
                        resolve(xhr);
                    } else if (attemptNumber < retries) {
                        console.log(`Попытка ${attemptNumber} не удалась. Статус: ${xhr.status}`);
                        makeRequest();
                    } else {
                        reject(new Error(`Запрос к ${url} не удался после ${retries} попыток. Статус: ${xhr.status}`));
                    }
                };

                xhr.onerror = (): void => {
                    if (attemptNumber < retries) {
                        console.log(`Ошибка соединения. Попытка ${attemptNumber}`);
                        makeRequest();
                    } else {
                        reject(new Error(`Ошибка соединения с ${url} после ${retries} попыток`));
                    }
                };

                xhr.ontimeout = (): void => {
                    if (attemptNumber < retries) {
                        console.log(`Таймаут. Попытка ${attemptNumber}`);
                        makeRequest();
                    } else {
                        reject(new Error(`Таймаут запроса к ${url} после ${retries} попыток`));
                    }
                };

                xhr.onabort = (): void => {
                    reject(new Error(`Запрос к ${url} был отменен`));
                };

                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else {
                    // Отправляем данные в правильном формате
                    if (headers['Content-Type'] === 'application/json') {
                        xhr.send(JSON.stringify(data));
                    } else {
                        const formData = new FormData();
                        Object.entries(data).forEach(([key, value]) => {
                            if (value instanceof File) {
                                formData.append(key, value);
                            } else {
                                formData.append(key, String(value));
                            }
                        });
                        xhr.send(formData);
                    }
                }
            };

            makeRequest();
        });
    };
}

/**
 * Запрос с возможностью повторных запросов.
 * @param url
 * @param options
 */
export function fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
    return new HTTPTransport().get(url, options);
}

/**
 * Пример использования
 *
fetchWithRetry('https://fakeapi.extendsclass.com/books/23456', {
    data: {limit: 3},
    retries: 3,
    timeout: 1000
})
    .then(response => {
        try {
            const json = JSON.parse(response.responseText);
            console.log('Результат:', json);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
 */
