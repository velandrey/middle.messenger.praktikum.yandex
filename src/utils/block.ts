import {EventBus} from "./event-bus";
import Handlebars from "handlebars";

export type TProps<T = Record<string, unknown>> = T & {
    events?: Record<string, EventListener>;
};
export type TChild = Record<string, Block>;
export default abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    _element: HTMLElement;
    protected _id: number = Math.floor(100000 + Math.random() * 900000);
    props: TProps;
    protected childrens: Record<string, Block>;
    protected lists: Record<string, any[]>;
    protected eventBus: () => EventBus;

    constructor(propsBlock: TProps = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsBlock);
        this.props = this._makePropsProxy({ ...props });
        this.childrens = children;
        this.lists = this._makePropsProxy({ ...lists });
        this.eventBus = ():EventBus => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
        children: Record<string, Block>,
        props: TProps,
        lists: Record<string, any[]>
    } {
        const children: Record<string, Block> = {};
        const props: TProps = {};
        const lists: Record<string, any[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            }
            else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    _registerEvents(eventBus:EventBus):void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        if(this.childrens){
            Object.values(this.childrens).forEach(child => {
                child.dispatchComponentDidMount();
            });
        }
        if(this.lists){
            Object.values(this.lists).flat().forEach(child => {
                if(child instanceof Block){
                    child.dispatchComponentDidMount();
                }
            });
        }
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {

    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps:TProps, newProps:TProps) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    _render():void {
        const propsAndStubs = { ...this.props };
        if(this.childrens){
            Object.entries(this.childrens).forEach(([key, child]) => {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            });
        }
        if(this.lists){
            Object.entries(this.lists).forEach(([key]) => {
                propsAndStubs[key] = `<div data-id="l-${key}"></div>`;
            });
        }
        const fragment = this._createDocumentElement('template');
        const compiledTpl = Handlebars.compile(this.render())
        const compiledHtml = compiledTpl(propsAndStubs);
        fragment.innerHTML = compiledHtml;
        if(this.childrens){
            Object.values(this.childrens).forEach(child => {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            });
        }
        if(this.lists){
            Object.entries(this.lists).forEach(([key, child]) => {
                const listCont = this._createDocumentElement('template');
                child.forEach(item => {
                    if (item instanceof Block) {
                        listCont.content.append(item.getContent());
                    } else {
                        listCont.content.append(`${item}`);
                    }
                });
                const stub = fragment.content.querySelector(`[data-id="l-${key}"]`);
                if (stub) {
                    stub.replaceWith(listCont.content);
                }
            });
        }
        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    render():string {
        return '';
    }

    private _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    getContent() {
        if (!this._element) {
            throw new Error('Элемент не создан')
        }
        return this._element
    }

    _makePropsProxy<T extends Record<string, unknown>>(props: T): T {
        const self = this;
        return new Proxy(props, {
            get(target: T, prop: string) {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set(target: T, prop: string, newValue: unknown) {
                const oldTarget = { ...target };
                target[prop] = newValue;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа')
            },
        })
    }

    public show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
