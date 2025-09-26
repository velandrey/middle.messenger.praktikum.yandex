import Block from "@/utils/block";

export class Route {
    private readonly _pathname: string;
    private readonly _block: Block;
    private readonly _selectorElementForRender: string;

    constructor(pathname: string, block: Block, selectorElementForRender:string = '#app') {
        this._pathname = pathname;
        this._block = block;
        this._block = block;
        this._selectorElementForRender = selectorElementForRender;
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname:string) {
        return pathname === this._pathname;
    }

    render() {
        const elementForRender = document.querySelector(this._selectorElementForRender);
        if (elementForRender) {
            this._block.dispatchComponentDidMount();
            const html = this._block.getContent();
            while (elementForRender.firstChild) {
                elementForRender.removeChild(elementForRender.firstChild);
            }
            elementForRender.appendChild(html);
        }
    }
}
