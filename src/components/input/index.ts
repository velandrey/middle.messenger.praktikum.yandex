import './style.pcss';
import Block from '@/utils/block'

export class Input extends Block {
    constructor({ ...props }:object) {
        super({...props})
    }

    render() {
        return `
            <div class="form_field">
                <label for="{{name}}" class="form_field_label">{{label}}:</label>
                <input type="{{type}}" name="{{name}}" id="{{name}}" class="form_field_input" value="{{value}}" {{required}}/>
            </div>

        `;
    }
}
