import './style.pcss';
import Block from '@/utils/block';

export class Button extends Block {
    constructor({...props}: object) {
        super({...props});
    }

    render() {
        return `
            <div class="form_field">
                <button id="{{id}}" class="button" type="{{type}}">
                    {{label}}
                </button>
            </div>
        `;
    }
}
