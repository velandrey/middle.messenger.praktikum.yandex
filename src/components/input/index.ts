import Block from '@/utils/block';

export class Input extends Block {
    constructor(props: object) {
        super({
            ...props
        });
    }

    render() {
        return `
            <input type="{{type}}" name="{{name}}" id="{{name}}" class="form_field_input" value="{{value}}" {{required}}/>
        `;
    }
}
