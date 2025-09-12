import { EventBus } from "./event-bus";
import Handlebars from "handlebars";

export type TypeProps<T = Record<string, unknown>> = T & {
    events?: Record<string, EventListener>;
};

export type TypeChild = Record<string, Block>;
export type TypeList = Record<string, Block[]>;

export default abstract class Block {
    static EVENTS: Record<string, string> = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    protected _element: HTMLElement | null = null;
    protected _id: number = Math.floor(100000 + Math.random() * 900000);
    protected props: TypeProps;
    protected children: TypeChild;
    protected lists: TypeList;
    protected eventBus: () => EventBus;

    protected constructor(propsBlock: TypeProps = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._geTypeChildrenPropsAndProps(propsBlock);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = this._makePropsProxy({ ...lists }) as TypeList;
        this._element = null;
        this.eventBus = (): EventBus => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _geTypeChildrenPropsAndProps(propsAndChildren: TypeProps): {
        children: TypeChild;
        props: TypeProps;
        lists: TypeList;
    } {
        const children: TypeChild = {};
        const props: TypeProps = {};
        const lists: TypeList = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        if (this.children) {
            Object.values(this.children).forEach((child: Block) => {
                child.dispatchComponentDidMount();
            });
        }
        if (this.lists) {
            Object.values(this.lists).flat().forEach((child: unknown) => {
                if (child instanceof Block) {
                    child.dispatchComponentDidMount();
                }
            });
        }
        this.componentDidMount();
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: TypeProps = {}, newProps: TypeProps = {}): void {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        return (oldProps && newProps) && true;
    }

    private _render(): void {
        const propsAndStubs: Record<string, unknown> = { ...this.props };

        if (this.children) {
            Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            });
        }

        if (this.lists) {
            Object.entries(this.lists).forEach(([key]: [string, Block[]]) => {
                propsAndStubs[key] = `<div data-id="l-${key}"></div>`;
            });
        }

        const fragment: HTMLTemplateElement = this._createDocumentElement('template');
        const compiledTpl: HandlebarsTemplateDelegate = Handlebars.compile(this.render());
        fragment.innerHTML = compiledTpl(propsAndStubs);

        if (this.children) {
            Object.values(this.children).forEach((child: Block) => {
                const stub: Element | null = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            });
        }

        if (this.lists) {
            Object.entries(this.lists).forEach(([key, childList]: [string, Block[]]) => {
                const listCont: HTMLTemplateElement = this._createDocumentElement('template');
                childList.forEach((item: Block | unknown) => {
                    if (item instanceof Block) {
                        listCont.content.append(item.getContent());
                    } else {
                        listCont.content.append(`${item}`);
                    }
                });
                const stub: Element | null = fragment.content.querySelector(`[data-id="l-${key}"]`);
                if (stub) {
                    stub.replaceWith(listCont.content);
                }
            });
        }

        const newElement: HTMLElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected abstract render(): string;

    private _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName: string) => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    public getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Элемент не создан');
        }
        return this._element;
    }

    private _makePropsProxy(props: TypeProps): TypeProps {
        return new Proxy(props, {
            get: (target: TypeProps, prop: string | symbol): unknown => {
                if (prop in target) {
                    const value = target[prop as keyof TypeProps];
                    return typeof value === 'function' ? (value).bind(target) : value;
                }
                return undefined;
            },
            set: (target: TypeProps, prop: string | symbol, newValue: unknown): boolean => {
                if (prop in target) {
                    const oldTarget: TypeProps = { ...target };
                    (target as Record<string | symbol, unknown>)[prop] = newValue;
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                    return true;
                }
                return false;
            },
            deleteProperty: (): never => {
                throw new Error('Нет доступа');
            },
        });
    }

    public setProps(nextProps: TypeProps): void {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }

    public show(): void {
        const content: HTMLElement = this.getContent();
        content.style.display = 'block';
    }

    public hide(): void {
        const content: HTMLElement = this.getContent();
        content.style.display = 'none';
    }
}