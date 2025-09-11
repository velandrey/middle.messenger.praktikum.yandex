export type EventCallback = (...args: []) => void;
export class EventBus {
    private listeners: Record<string, EventCallback[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(
            (listener: EventCallback): boolean => listener !== callback
        );
    }

    emit(event: string, ...args: []): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(function (listener: EventCallback):void {
            listener(...args);
        });
    }
}
