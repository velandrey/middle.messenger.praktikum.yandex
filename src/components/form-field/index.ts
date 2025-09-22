import './style.pcss';
import Block from '@/utils/block';
import {Input} from "@/components";
import {FormValidator} from "@/utils/validator";

export class FormField extends Block {
    constructor(props: object) {
        super({
            ...props,
            Input: new Input({
                ...props,
                events: {
                    blur: (e: Event) => {
                        const validator = new FormValidator();
                        if (e.target instanceof HTMLInputElement) {
                            const validationResult = validator.validateField(e.target.name, e.target.value);
                            if (validationResult.isValid) {
                                this.props.error = '';
                            } else {
                                this.props.error = validationResult.errorMessage;
                            }
                        }
                    },
                }
            })
        });
    }

    render() {
        return `
            <div class="form_field">
                <label for="{{name}}" class="form_field_label">{{label}}:</label>
                {{{Input}}}
                <div class="form_field_error">{{error}}</div>
            </div>
        `;
    }
}
