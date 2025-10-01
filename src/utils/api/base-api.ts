import {HttpRequestOptions, HTTPTransport} from "@/utils/http-transport";

export class BaseAPI {
    protected transport: HTTPTransport;
    protected baseURL: string;
    protected options: HttpRequestOptions;

    constructor(baseURL: string) {
        this.transport = new HTTPTransport();
        this.baseURL = baseURL;
        this.options = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
    }

    private toJSON(request: XMLHttpRequest) {
        try {
            return JSON.parse(request.response);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return request.response;//В случае ошибки parse ошибки вернуть response
        }
    }

    protected async get(url: string, options = {}) {
        const request = await this.transport
            .get(this.baseURL + url, options);
        return await this.toJSON(request);
    }

    protected async post(url: string, options = {}) {
        const request = await this.transport
            .post(this.baseURL + url, options);
        return await this.toJSON(request);
    }

    protected async put(url: string, options = {}) {
        const request = await this.transport
            .put(this.baseURL + url, options);
        return await this.toJSON(request);
    }

    protected async delete(url: string, options = {}) {
        const request = await this.transport
            .put(this.baseURL + url, options);
        return await this.toJSON(request);
    }
}
